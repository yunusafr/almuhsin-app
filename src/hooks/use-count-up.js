import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Animasi angka naik dari 0 ke `target` ketika elemen terlihat di layar.
 * Menghormati prefers-reduced-motion: nilai langsung melompat ke target.
 */
export function useCountUp(target, { duration = 1600, enabled = true } = {}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef(null);
  const frameRef = useRef(null);

  const reduceMotion = prefersReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element || !enabled || reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, reduceMotion]);

  useEffect(() => {
    if (!started || !enabled || reduceMotion) return;

    const from = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      setValue(from + (target - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [started, target, duration, enabled, reduceMotion]);

  return {
    ref,
    value: enabled && !reduceMotion ? value : target,
  };
}
