import useIdleLogout from "@/hooks/use-idle-logout";

/**
 * Komponen kecil yang mengaktifkan auto-logout saat pengguna tidak aktif.
 * Dipasang di layout dashboard (hanya untuk area yang sudah login).
 */
export default function IdleLogout() {
  useIdleLogout();

  return null;
}
