import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const excludedPaths = ["/user/signup", "/auth/login"];
  const isExcluded = excludedPaths.some((path) => config.url?.includes(path));

  const token = localStorage.getItem("accessToken");
  if (token && !isExcluded) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
