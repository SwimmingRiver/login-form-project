import { useQuery } from "@tanstack/react-query";
import readComments from "../../api/comments/readComments";

const useReadComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => readComments(postId),
  });
};
export default useReadComments;
