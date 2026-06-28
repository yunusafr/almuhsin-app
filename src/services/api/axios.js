import axios from "axios";
import { getToken } from "./token";

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

export default api;
