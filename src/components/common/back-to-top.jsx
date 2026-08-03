import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getScroller() {
  return (
    document.querySelector("[data-scroll-container]") ?? window
  );
}

function getScrollY(scroller) {
  if (scroller === window) return window.scrollY;

  return scroller.scrollTop;
}

/**
 * Tombol float "kembali ke atas" — muncul setelah halaman digulir
 * cukup jauh, dan menggulir halus ke atas saat diklik.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scroller = getScroller();
    const target = scroller === window ? window : scroller;

    const handleScroll = () => {
      setVisible(getScrollY(scroller) > 300);
    };

    target.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      target.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    const scroller = getScroller();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const options = reduced
      ? { top: 0 }
      : { top: 0, behavior: "smooth" };

    if (scroller === window) {
      window.scrollTo(options);
    } else {
      scroller.scrollTo(options);
    }
  }

  return (
    <Button
      variant="default"
      aria-label="Kembali ke atas"
      onClick={handleClick}
      className={cn(
        "fixed bottom-24 right-5 z-40 h-11 w-11 rounded-full shadow-lg shadow-green-900/30 transition-all duration-300 md:bottom-6 md:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
