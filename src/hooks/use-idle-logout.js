import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import useAuthStore from "@/features/auth/stores/auth-store";
import { removeToken } from "@/features/auth/lib/token";

/**
 * Batas waktu tidak aktif sebelum sesi dianggap berakhir (10 menit).
 */
export const IDLE_LIMIT = 10 * 60 * 1000;

/**
 * Peringatan ditampilkan 1 menit sebelum sesi berakhir.
 */
export const IDLE_WARNING_BEFORE = 60 * 1000;

const IDLE_TOAST_ID = "idle-session-warning";

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "click",
  "touchstart",
];

/**
 * Otomatis logout ketika pengguna tidak aktif selama `idleLimit`.
 *
 * Timer `setTimeout` di-throttle oleh browser saat tab di-background —
 * menunggu tanpa menyentuh tab bisa membuat logout tertunda tak tentu.
 * Karena itu dipasang juga listener `visibilitychange`: saat tab kembali
 * aktif, idle dihitung dari timestamp aktivitas terakhir, bukan dari
 * timer — jika sudah melewati batas, logout langsung dijalankan.
 */
export default function useIdleLogout({
  idleLimit = IDLE_LIMIT,
  warningBefore = IDLE_WARNING_BEFORE,
} = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logoutStore = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Timestamp aktivitas terakhir — sumber kebenaran untuk cek idle,
  // tidak bergantung pada akurasi timer background.
  const lastActivityRef = useRef(null);

  const isAuthenticatedRef = useRef(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    isAuthenticatedRef.current = isAuthenticated;

    let timer;
    let warningTimer;

    const clearAll = () => {
      clearTimeout(timer);
      clearTimeout(warningTimer);
    };

    const handleExpire = () => {
      if (!isAuthenticatedRef.current) return;

      removeToken();

      logoutStore();

      queryClient.clear();

      toast.info(
        "Sesi berakhir karena tidak ada aktivitas selama beberapa menit. Silakan login kembali.",
        { id: IDLE_TOAST_ID }
      );

      navigate("/login", { replace: true });
    };

    const showWarning = () => {
      toast.warning(
        "Anda tidak aktif. Sesi akan berakhir dalam 1 menit.",
        { id: IDLE_TOAST_ID }
      );
    };

    const schedule = () => {
      clearAll();

      lastActivityRef.current = Date.now();

      toast.dismiss(IDLE_TOAST_ID);

      timer = setTimeout(handleExpire, idleLimit);

      warningTimer = setTimeout(
        showWarning,
        Math.max(0, idleLimit - warningBefore)
      );
    };

    // Tab kembali aktif — hitung idle dari timestamp, bukan timer
    // (timer background di-throttle browser).
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;

      if (lastActivityRef.current === null) {
        lastActivityRef.current = Date.now();
        return;
      }

      const idleMs = Date.now() - lastActivityRef.current;

      if (idleMs >= idleLimit) {
        clearAll();
        handleExpire();
        return;
      }

      // Sisa waktu yang tersisa sampai batas idle.
      const remaining = idleLimit - idleMs;

      if (remaining <= warningBefore) {
        clearAll();
        showWarning();

        timer = setTimeout(handleExpire, remaining);
      } else {
        // Jadwalkan ulang timer dengan sisa waktu yang benar.
        clearAll();
        toast.dismiss(IDLE_TOAST_ID);

        timer = setTimeout(handleExpire, remaining);

        warningTimer = setTimeout(
          showWarning,
          Math.max(0, remaining - warningBefore)
        );
      }
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, schedule, { passive: true })
    );

    document.addEventListener("visibilitychange", handleVisibility);

    schedule();

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, schedule)
      );

      document.removeEventListener("visibilitychange", handleVisibility);

      clearAll();

      toast.dismiss(IDLE_TOAST_ID);
    };
  }, [isAuthenticated, idleLimit, warningBefore, logoutStore, navigate, queryClient]);
}
