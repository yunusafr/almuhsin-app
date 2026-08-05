import api from "@/services/api/axios";

export const getStudents = async (params = {}) => {
  const { data } = await api.get("/students", { params });

  // API v2 paginated: { success, data: { items, pagination } } —
  // dibiarkan utuh agar halaman memakai listData/listPagination.
  return data;
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

/*
|--------------------------------------------------------------------------
| External System
|--------------------------------------------------------------------------
*/

export const searchExternalStudents = async (keyword, tingkat) => {
  const { data } = await api.get("/students/external-search", {
    params: {
      q: keyword,
      // Filter tingkat opsional (10/11/12) — kosongkan untuk global
      ...(tingkat ? { tingkat } : {}),
    },
  });

  return data.data;
};

export const pullExternalStudents = async (payload) => {
  const { data } = await api.post(
    "/students/external-pull",
    payload,
  );

  return data;
};

export const syncStudents = async () => {
  const { data } = await api.post("/students/external-sync");

  return data;
};