import api from "@/services/api/axios";

export const getStudents = async () => {
  const { data } = await api.get("/students");

  return data.data;
};

export const getStudent = async (id) => {
  const { data } = await api.get(`/students/${id}`);

  return data.data;
};

export const createStudent = async (payload) => {
  const { data } = await api.post("/students", payload);

  return data;
};

export const updateStudent = async ({ id, payload }) => {
  const { data } = await api.put(`/students/${id}`, payload);

  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await api.delete(`/students/${id}`);

  return data;
};

export const syncStudents = async () => {
  const { data } = await api.post("/students/external-sync");

  return data;
};