import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReadComments from "../../hooks/comments/useReadComments";
import useCreatComment from "../../hooks/comments/useCreateComment";
import { CommentInterface } from "../../types/comments";
import { Button } from "@chakra-ui/react";
import CommentListItem from "./CommentListItem";

function CommentsList() {
  const { id } = useParams();

  const { data, refetch } = useReadComments(`${id}`);
  const { mutate: writeComment, isSuccess: isWriteSuccess } = useCreatComment({
    post: `${id}`,
    content: "hello",
  });

  useEffect(() => {
    if (isWriteSuccess) {
      refetch();
    }
  }, [isWriteSuccess]);

  return (
    <div>
      CommentsList
      <button onClick={() => writeComment()}>write</button>
      {data?.map((comment: CommentInterface) => (
        <CommentListItem comment={comment} />
      ))}
    </div>
  );
}

export default CommentsList;
