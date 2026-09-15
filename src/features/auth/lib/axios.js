// Instance axios terpadu — satu interceptor (401 auto-refresh + 429 toast) dan
// satu baseURL (VITE_API_URL). File ini dipertahankan sebagai alias agar impor
// `@/features/auth/lib/axios` tetap valid tanpa menyentuh pemanggilnya.
export { default } from "@/services/api/axios";
