import { PostInterface } from "../../types/posts";
import apiClient from "../apiClient";

const edit = async (id: string, data: PostInterface) => {
  try {
    const res = await apiClient.patch(`/posts/${id}`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default edit;
