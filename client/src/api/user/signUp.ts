import axios from "axios";
import { UserInterface } from "../../types/user";
const signUp = async (data: UserInterface) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    const res = await axios.post(`${baseUrl}/user`, data);
    if (res.status === 200) {
      console.log("complete sign up");
    }
  } catch (error) {
    console.error(error);
  }
};
export default signUp;
