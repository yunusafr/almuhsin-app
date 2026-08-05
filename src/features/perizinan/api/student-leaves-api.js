import api from "@/services/api/axios";

/*
|--------------------------------------------------------------------------
| GET ALL (paginasi + search)
|--------------------------------------------------------------------------
*/

export const getStudentLeaves = async (params = {}) => {
  const { data } = await api.get("/student-leaves", { params });

  return data;
};
/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createStudentLeave = async (payload) => {
  const { data } = await api.post("/student-leaves", payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| UPDATE (misal: santri kembali)
|--------------------------------------------------------------------------
*/

export const updateStudentLeave = async (id, payload) => {
  const { data } = await api.put(`/student-leaves/${id}`, payload);

  return data;
};
