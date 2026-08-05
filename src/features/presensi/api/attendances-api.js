import api from "@/services/api/axios";

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export const getAttendances = async (params = {}) => {
  const { data } = await api.get("/attendances", { params });

  return data;
};
/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createAttendance = async (payload) => {
  const { data } = await api.post("/attendances", payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| GET DETAIL
|--------------------------------------------------------------------------
*/

export const getAttendance = async (id) => {
  const { data } = await api.get(`/attendances/${id}`);

  return data;
};
