import { useMutation } from "@tanstack/react-query";
import createComment from "../../api/comments/createComment";
import { CommentInterface } from "../../types/comments";

const useCreatComment = (data: CommentInterface) => {
  return useMutation({ mutationFn: () => createComment(data) });
};

export default useCreatComment;
