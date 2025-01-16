import apiClient from "../apiClient";

const me = async (data: any) => {
  const res = await apiClient.get(`/auth/me`, data);
  return res.data;
};
export default me;
