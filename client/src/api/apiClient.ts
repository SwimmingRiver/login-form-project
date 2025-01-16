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

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(err.config);
      } catch (error) {
        console.error("Token refresh failed", err);
        localStorage.removeItem("acessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
  }
);

export default apiClient;
