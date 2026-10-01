import api from "@/services/api/axios";

/*
|--------------------------------------------------------------------------
| Berita / Pengumuman
|--------------------------------------------------------------------------
| Berkas ini menangani pengiriman data ke server. Unggahan foto memakai
| FormData, dan pengubahan memakai POST + _method=PUT karena PHP tidak
| membaca berkas pada permintaan PUT biasa.
*/

function keFormData(payload, berkasFoto) {
  const fd = new FormData();

  Object.entries(payload).forEach(([kunci, nilai]) => {
    if (nilai === undefined || nilai === null) return;
    fd.append(kunci, typeof nilai === "boolean" ? (nilai ? 1 : 0) : nilai);
  });

  if (berkasFoto) fd.append("cover", berkasFoto);

  return fd;
}

/* Daftar berita untuk pengelolaan (butuh login) */
export const getNews = async (params = {}) => {
  const { data } = await api.get("/news", { params });
  return data;
};

export const getNewsDetail = async (id) => {
  const { data } = await api.get(`/news/${id}`);
  return data.data;
};

export const createNews = async ({ payload, cover }) => {
  const { data } = await api.post("/news", keFormData(payload, cover));
  return data;
};

export const updateNews = async ({ id, payload, cover }) => {
  const fd = keFormData(payload, cover);
  fd.append("_method", "PUT"); // PHP tidak membaca berkas pada PUT biasa

  const { data } = await api.post(`/news/${id}`, fd);
  return data;
};

export const deleteNews = async (id) => {
  const { data } = await api.delete(`/news/${id}`);
  return data;
};

export const getTrashedNews = async () => {
  const { data } = await api.get("/news/trashed");
  return data.data;
};

export const restoreNews = async (id) => {
  const { data } = await api.post(`/news/${id}/restore`);
  return data;
};

/* Halaman depan (publik, tanpa login) */
export const getPublicNews = async (params = {}) => {
  const { data } = await api.get("/public/news", { params });
  return data;
};

export const getPublicNewsDetail = async (slug) => {
  const { data } = await api.get(`/public/news/${slug}`);
  return data.data;
};
