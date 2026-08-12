import api from "@/services/api/axios";

/*
||--------------------------------------------------------------------------
|| GET ALL (akun satpam)
||--------------------------------------------------------------------------
*/

export const getSecurityGuards = async (params = {}) => {
  const { data } = await api.get("/security-guards", { params });

  return data;
};

/*
||--------------------------------------------------------------------------
|| CREATE
||--------------------------------------------------------------------------
*/

export const createSecurityGuard = async (payload) => {
  const { data } = await api.post("/security-guards", payload);

  return data;
};

/*
||--------------------------------------------------------------------------
|| UPDATE (ubah nama/email / reset password)
||--------------------------------------------------------------------------
*/

export const updateSecurityGuard = async ({ id, payload }) => {
  const { data } = await api.put(`/security-guards/${id}`, payload);

  return data;
};

/*
||--------------------------------------------------------------------------
|| DELETE
||--------------------------------------------------------------------------
*/

export const deleteSecurityGuard = async (id) => {
  const { data } = await api.delete(`/security-guards/${id}`);

  return data;
};
