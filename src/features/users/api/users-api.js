import api from "@/services/api/axios";

const ENDPOINT = "/users";

export const getUsers = async () => {
  const { data } = await api.get(ENDPOINT);

  return data.data;
};

export const createUser = async (payload) => {
  const { data } = await api.post(ENDPOINT, payload);

  return data;
};

export const updateUser = async ({ id, payload }) => {
  const { data } = await api.put(`${ENDPOINT}/${id}`, payload);

  return data;
};

export const resetUserPassword = async ({ id, password }) => {
  const { data } = await api.post(`${ENDPOINT}/${id}/reset-password`, {
    password,
  });

  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`${ENDPOINT}/${id}`);

  return data;
};
