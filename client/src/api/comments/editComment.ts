import { CommentInterface } from "../../types/comments";
import apiClient from "../apiClient";

const editComment = async (id: string, data: CommentInterface) => {
  try {
    const res = await apiClient.patch(`/comments/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default editComment;
