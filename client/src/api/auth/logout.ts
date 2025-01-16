import apiClient from "../apiClient";

const logout = async () => {
  try {
    const res = await apiClient.post(
      `auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("accessToken");
    return res;
  } catch (error) {
    console.error("Fail to logout");
  }
};

export default logout;
