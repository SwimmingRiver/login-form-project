import React, { useCallback, useEffect, useState } from "react";
import { CommentInterface } from "../../types/comments";
import { Button } from "@chakra-ui/react";
import styles from "./CommentListItem.module.css";

import useDeleteComment from "../../hooks/comments/useDeleteComment";
import useEditComment from "../../hooks/comments/useEditComment";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../store/authStore";
interface CommentListItemProps {
  comment: CommentInterface;
}
const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: editComment, isSuccess: isEditSuccess } = useEditComment(
    `${comment._id}`,
    { content: "hihi", post: `${id}` }
  );
  const { mutate: removeComment, isSuccess: isRemoveSuccess } =
    useDeleteComment(`${comment._id}`);
  useEffect(() => {
    if (isEditSuccess || isRemoveSuccess) {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    }
  }, [isEditSuccess, isRemoveSuccess]);
  const onClickEditButton = useCallback(() => {
    setIsEdit((prev) => !prev);
    if (isEdit) {
      editComment();
    }
  }, [isEdit]);

  return (
    <div key={comment._id} className={styles.wrapper}>
      {isEdit ? (
        <input placeholder="댓글을 수정하세요" />
      ) : (
        <p>{comment.content}</p>
      )}
      <p>{comment.author?.username}</p>
      {comment?.author?._id.toString() === user?.sub && (
        <div>
          <Button
            onClick={() => {
              onClickEditButton();
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
      )}
    </div>
  );
};

export default CommentListItem;
