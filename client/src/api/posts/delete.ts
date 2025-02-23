import apiClient from "../apiClient";

const remove = async (id: string) => {
  try {
    const res = await apiClient.delete(`posts/${id}`);
    return "complete delete";
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default remove;
