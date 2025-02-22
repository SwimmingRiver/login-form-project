import { CommentInterface } from "../../types/comments";
import apiClient from "../apiClient";

const createComment = async (data: CommentInterface) => {
  try {
    const res = await apiClient.post("/comments", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default createComment;
