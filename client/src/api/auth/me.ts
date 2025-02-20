import apiClient from "../apiClient";
import axios from "axios";

const me = async (data: any) => {
  try {
    const res = await apiClient.get(`/auth/me`, data);
    console.log(res);
    return res.data;
  } catch (err: any) {
    if (err.response.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;

        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(err.config);
      } catch (error) {
        console.error("Token refresh failed", err);

        return Promise.reject(error);
      }
    }
  }
};
export default me;
