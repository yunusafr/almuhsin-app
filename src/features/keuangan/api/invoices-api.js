import api from "@/services/api/axios";

const ENDPOINT = "/invoices";

export const getInvoices = async (params = {}) => {
  const { data } = await api.get(ENDPOINT, { params });

  return data;
};

export const getInvoice = async (id) => {
  const { data } = await api.get(`${ENDPOINT}/${id}`);

  return data;
};

export const createInvoices = async (payload) => {
  const { data } = await api.post(ENDPOINT, payload);

  return data;
};
