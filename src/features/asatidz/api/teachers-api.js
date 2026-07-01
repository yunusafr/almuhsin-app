import api from "@/services/api/axios";

export const getTeachers = async () => {
  const { data } = await api.get("/teachers");

  return data.data;
};

export const getTeacher = async (id) => {
  const { data } = await api.get(`/teachers/${id}`);

  return data.data;
};

export const createTeacher = async (payload) => {
  const { data } = await api.post("/teachers", payload);

  return data;
};

export const updateTeacher = async ({ id, payload }) => {
  const { data } = await api.put(`/teachers/${id}`, payload);

  return data;
};

export const deleteTeacher = async (id) => {
  const { data } = await api.delete(`/teachers/${id}`);

  return data;
};
