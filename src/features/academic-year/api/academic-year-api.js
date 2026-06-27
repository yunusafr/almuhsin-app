import api from "@/services/api/axios";

const ENDPOINT = "/academic-years";

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export const getAcademicYears = async () => {
  const { data } = await api.get(ENDPOINT);

  return data;
};

/*
|--------------------------------------------------------------------------
| GET DETAIL
|--------------------------------------------------------------------------
*/

export const getAcademicYear = async (id) => {
  const { data } = await api.get(`${ENDPOINT}/${id}`);

  return data;
};

/*
|--------------------------------------------------------------------------
| GET ACTIVE
|--------------------------------------------------------------------------
*/

export const getActiveAcademicYear = async () => {
  const { data } = await api.get(`${ENDPOINT}/active`);

  return data;
};

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createAcademicYear = async (payload) => {
  const { data } = await api.post(ENDPOINT, payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateAcademicYear = async ({ id, payload }) => {
  const { data } = await api.put(`${ENDPOINT}/${id}`, payload);

  return data;
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteAcademicYear = async (id) => {
  const { data } = await api.delete(`${ENDPOINT}/${id}`);

  return data;
};