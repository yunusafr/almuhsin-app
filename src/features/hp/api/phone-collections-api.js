import api from "@/services/api/axios";

/*
||--------------------------------------------------------------------------
|| GET ALL (filter status & student_id opsional)
||--------------------------------------------------------------------------
*/

export const getPhoneCollections = async (params = {}) => {
  const { data } = await api.get("/phone-collections", { params });

  return data;
};
/*
||--------------------------------------------------------------------------
|| CREATE (bulk) — kegiatan rutin pengumpulan HP
||--------------------------------------------------------------------------
*/

export const createBulkPhoneCollection = async (payload) => {
  const { data } = await api.post("/phone-collections/bulk", payload);

  return data;
};

/*
||--------------------------------------------------------------------------
|| CREATE (single) — santri terlambat / menyusul
||--------------------------------------------------------------------------
*/

export const createPhoneCollection = async (payload) => {
  const { data } = await api.post("/phone-collections", payload);

  return data;
};

/*
||--------------------------------------------------------------------------
|| UPDATE (pengembalian HP)
||--------------------------------------------------------------------------
*/

export const returnPhoneCollection = async ({ id, payload }) => {
  const { data } = await api.put(`/phone-collections/${id}`, payload);

  return data;
};

/*
||--------------------------------------------------------------------------
|| DELETE
||--------------------------------------------------------------------------
*/

export const deletePhoneCollection = async (id) => {
  const { data } = await api.delete(`/phone-collections/${id}`);

  return data;
};
