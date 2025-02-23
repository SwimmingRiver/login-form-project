import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const excludedPaths = ["/user/signup"];
  const isExcluded = excludedPaths.some((path) => config.url?.includes(path));

  if (isExcluded) {
    config.withCredentials = false;
  }

  return config;
});

export default apiClient;
