import api from "@/services/api/axios";

/*
|--------------------------------------------------------------------------
| GET ALL (paginasi + search + filter tanggal)
|--------------------------------------------------------------------------
*/

export const getTeacherAttendances = async (params = {}) => {
  const { data } = await api.get("/teacher-attendances", { params });

  return data;
};

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createTeacherAttendance = async (payload) => {
  const { data } = await api.post("/teacher-attendances", payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateTeacherAttendance = async (id, payload) => {
  const { data } = await api.put(`/teacher-attendances/${id}`, payload);

  return data;
};
