import { useMutation } from "@tanstack/react-query";
import removeComment from "../../api/comments/removeComments";

const useDeleteComment = (id: string) => {
  return useMutation({ mutationFn: () => removeComment(id) });
};
export default useDeleteComment;
