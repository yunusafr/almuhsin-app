import { useEffect } from "react";
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
 * Menampilkan peringatan `warningBefore` ms sebelum sesi berakhir.
 */
export default function useIdleLogout({
  idleLimit = IDLE_LIMIT,
  warningBefore = IDLE_WARNING_BEFORE,
} = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logoutStore = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    let timer;
    let warningTimer;

    const clearAll = () => {
      clearTimeout(timer);
      clearTimeout(warningTimer);
    };

    const handleExpire = () => {
      removeToken();

      logoutStore();

      queryClient.clear();

      toast.info(
        "Sesi berakhir karena tidak ada aktivitas selama beberapa menit. Silakan login kembali.",
        { id: IDLE_TOAST_ID }
      );

      navigate("/login", { replace: true });
    };

    const schedule = () => {
      clearAll();

      toast.dismiss(IDLE_TOAST_ID);

      timer = setTimeout(handleExpire, idleLimit);

      warningTimer = setTimeout(() => {
        toast.warning(
          "Anda tidak aktif. Sesi akan berakhir dalam 1 menit.",
          { id: IDLE_TOAST_ID }
        );
      }, Math.max(0, idleLimit - warningBefore));
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, schedule, { passive: true })
    );

    schedule();

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, schedule)
      );

      clearAll();

      toast.dismiss(IDLE_TOAST_ID);
    };
  }, [isAuthenticated, idleLimit, warningBefore, logoutStore, navigate, queryClient]);
}
