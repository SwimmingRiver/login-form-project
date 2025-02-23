import { useMutation } from "@tanstack/react-query";
import editComment from "../../api/comments/editComment";
import { CommentInterface } from "../../types/comments";

const useEditComment = (id: string, data: CommentInterface) => {
  return useMutation({ mutationFn: () => editComment(id, data) });
};
export default useEditComment;
