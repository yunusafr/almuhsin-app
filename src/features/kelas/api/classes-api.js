import api from "@/services/api/axios";

export const getClasses = async () => {
  const { data } = await api.get("/classes");
  return data.data;
};

export const getClass = async (id) => {
  const { data } = await api.get(`/classes/${id}`);
  return data.data;
};

export const createClass = async (payload) => {
  const { data } = await api.post("/classes", payload);
  return data;
};

export const updateClass = async ({ id, payload }) => {
  const { data } = await api.put(`/classes/${id}`, payload);
  return data;
};

export const deleteClass = async (id) => {
  const { data } = await api.delete(`/classes/${id}`);
  return data;
};
