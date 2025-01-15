import axios from "axios";
import { UserInterface } from "../../types/user";

const login = async (data: UserInterface) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
    if (res.status === 200) {
      console.log("Complete login");
      return res.data;
    } else if (res.status === 400) {
      console.error("Invalid data provided.");
    } else if (res.status === 500) {
      console.error("Server error. Please try again later.");
    } else {
      console.warn(`Unhandled status code: ${res.status}`);
    }

    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Request failed with status code: ${error.response.status}`
        );
        console.error("Response data:", error.response.data);

        if (error.response.status === 401) {
          console.error("Unauthorized. Please check your credentials.");
        } else if (error.response.status === 409) {
          console.error("Conflict. User already exists.");
        }
      } else if (error.request) {
        console.error("No response received from server.");
      } else {
        console.error("Error during request creation:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
export default login;
