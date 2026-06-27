import axios from "@/services/api/axios";

export const loginRequest = async (payload) => {
  const { data } = await axios.post("/login", payload);

  return data;
};

export const meRequest = async () => {
  const { data } = await axios.get("/me");

  return data;
};
