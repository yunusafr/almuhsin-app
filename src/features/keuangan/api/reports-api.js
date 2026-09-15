import api from "@/services/api/axios";

export const getAgingReport = async () => {
  const { data } = await api.get("/reports/aging");

  return data;
};

export const getCashFlowReport = async () => {
  const { data } = await api.get("/reports/cash-flow");

  return data;
};
