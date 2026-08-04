import api from "@/services/api/axios";

/*
|--------------------------------------------------------------------------
| GET ALL (filter class_id & academic_year_id opsional)
|--------------------------------------------------------------------------
*/

export const getEnrollments = async (params = {}) => {
  const { data } = await api.get("/enrollments", { params });

  return data;
};

/*
|--------------------------------------------------------------------------
| CREATE (single)
|--------------------------------------------------------------------------
*/

export const createEnrollment = async (payload) => {
  const { data } = await api.post("/enrollments", payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| CREATE (bulk)
|--------------------------------------------------------------------------
*/

export const createBulkEnrollment = async (payload) => {
  const { data } = await api.post("/enrollments/bulk", payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| UPDATE (pindah kelas / status)
|--------------------------------------------------------------------------
*/

export const updateEnrollment = async ({ id, payload }) => {
  const { data } = await api.put(`/enrollments/${id}`, payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteEnrollment = async (id) => {
  const { data } = await api.delete(`/enrollments/${id}`);

  return data;
};
