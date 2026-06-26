import api from "@/features/auth/lib/axios";

export const login = async (payload) => {
  const { data } = await api.post("/login", payload);

  return data.data;
};

export const me = async () => {
  const { data } = await api.get("/me");

  return data.data;
};
