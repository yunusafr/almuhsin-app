import axios from "axios";
import { toast } from "sonner";
import { getToken, removeToken } from "./token";

const api = axios.create({
  baseURL: "https://api-almuhsin.ingintau.my.id/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const url = error.config?.url ?? "";

    // 429 — rate limit (mis. login 5x/menit): tampilkan pesan backend.
    if (status === 429) {
      toast.error(
        message ??
          "Terlalu banyak percobaan. Silakan coba lagi beberapa saat lagi.",
      );
    }

    // 401 — token tidak valid / sesi kedaluwarsa: bersihkan & kembali login.
    // POST /login & /me ditangani sendiri oleh halaman login / AuthProvider.
    if (
      status === 401 &&
      !url.includes("/login") &&
      !url.includes("/me")
    ) {
      removeToken();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
