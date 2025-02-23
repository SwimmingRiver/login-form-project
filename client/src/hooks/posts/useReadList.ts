import { useQuery } from "@tanstack/react-query";
import readList from "../../api/posts/readList";

const useReadList = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["postList", page, limit],
    queryFn: () => readList(page, limit),
  });
};
export default useReadList;
