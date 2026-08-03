import api from "@/services/api/axios";

const ENDPOINT = "/payments";

export const getPaymentsByInvoice = async (invoiceId) => {
  const { data } = await api.get(`${ENDPOINT}/invoice/${invoiceId}`);

  return data;
};

export const createPayment = async (payload) => {
  const { data } = await api.post(ENDPOINT, payload);

  return data;
};
