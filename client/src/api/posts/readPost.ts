import apiClient from "../apiClient";

const readPost = async (id: string) => {
  try {
    const res = await apiClient.get(`/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export default readPost;
