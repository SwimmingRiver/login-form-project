import apiClient from "../apiClient";

const readComments = async (postId: string) => {
  try {
    const res = await apiClient.get(`/comments/post/${postId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default readComments;
