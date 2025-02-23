import { PostInterface } from "../../types/posts";
import apiClient from "../apiClient";

const create = async (data: PostInterface) => {
  try {
    const res = await apiClient.post("/posts", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export default create;
