import axios from "axios";
import { getToken, setToken, removeToken } from "./token";

const BASE_URL = "https://api-almuhsin.ingintau.my.id/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
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

// Satu refresh untuk banyak request 401 yang datang bersamaan.
let refreshPromise = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${BASE_URL}/refresh`,
        null,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      )
      .then(({ data }) => data?.data?.token ?? null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const { config, response } = error;
    const status = response?.status;
    const url = config?.url ?? "";

    // 401 — token kedaluwarsa: auto-refresh sekali, lalu ulangi request
    // (alur POST /refresh — dokumentasi API v2). POST /login tidak
    // di-refresh; error login ditangani halaman login.
    if (
      status === 401 &&
      !url.includes("/login") &&
      !url.includes("/refresh") &&
      !config._retry
    ) {
      config._retry = true;

      try {
        const newToken = await refreshAccessToken();

        if (newToken) {
          setToken(newToken);

          config.headers.Authorization = `Bearer ${newToken}`;

          return api(config);
        }
      } catch {
        // Refresh gagal — sesi benar-benar berakhir.
      }

      removeToken();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
