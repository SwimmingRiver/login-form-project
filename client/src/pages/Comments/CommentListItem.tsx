import React, { useEffect } from "react";
import { CommentInterface } from "../../types/comments";
import { Button } from "@chakra-ui/react";

import useDeleteComment from "../../hooks/comments/useDeleteComment";
import useEditComment from "../../hooks/comments/useEditComment";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
interface CommentListItemProps {
  comment: CommentInterface;
}
const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: editComment, isSuccess: isEditComment } = useEditComment(
    `${comment._id}`,
    { content: "hihi", post: `${id}` }
  );
  const { mutate: removeComment, isSuccess: isRemoveSuccess } =
    useDeleteComment(`${comment._id}`);
  useEffect(() => {
    if (isEditComment || isRemoveSuccess) {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    }
  }, [isEditComment, isRemoveSuccess]);
  return (
    <div key={comment._id}>
      <p>{comment.content}</p>
      <p>{comment.author?.username}</p>
      <Button
        onClick={() => {
          editComment();
        }}
      >
        edit
      </Button>
      <Button
        onClick={() => {
          removeComment();
        }}
      >
        delete
      </Button>
    </div>
  );
};

export default CommentListItem;
