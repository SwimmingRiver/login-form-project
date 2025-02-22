import apiClient from "../apiClient";

const removeComment = async (id: string) => {
  try {
    const res = await apiClient.delete(`/comments/${id}`);
    return "complete delete";
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default removeComment;
