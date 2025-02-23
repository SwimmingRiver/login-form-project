import apiClient from "../apiClient";

const readList = async (page = 1, limit = 10) => {
  try {
    const res = await apiClient.get("/posts", {
      params: { page, limit },
    });
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
export default readList;
