import { useQuery } from "@tanstack/react-query";
import readPost from "../../api/posts/readPost";

const useReadPost = (id: string) => {
  return useQuery({
    queryKey: ["post", `${id}`],
    queryFn: () => readPost(id),
  });
};
export default useReadPost;
