import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useReadComments from "../../hooks/comments/useReadComments";
import useCreatComment from "../../hooks/comments/useCreateComment";
import { CommentInterface } from "../../types/comments";
import { Button } from "@chakra-ui/react";
import CommentListItem from "./CommentListItem";

function CommentsList() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { data, refetch } = useReadComments(`${id}`);
  const { mutate: writeComment, isSuccess: isWriteSuccess } = useCreatComment({
    post: `${id}`,
    content: comment,
  });

  useEffect(() => {
    if (isWriteSuccess) {
      setComment("");
      refetch();
    }
  }, [isWriteSuccess]);

  return (
    <div>
      <input
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => writeComment()}>write</button>
      {data?.map((comment: CommentInterface) => (
        <CommentListItem comment={comment} />
      ))}
    </div>
  );
}

export default CommentsList;
