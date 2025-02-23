import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useReadPost from "../../hooks/posts/useReadPost";
import useEdit from "../../hooks/posts/useEdit";
import useDelete from "../../hooks/posts/useDelete";
import { Button } from "@chakra-ui/react";
import CommentsList from "../Comments/CommentsList";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useReadPost(`${id}`);
  const { mutate: edit, isSuccess } = useEdit(`${id}`, {
    title: "edited ",
    contents: "edited cotents",
  });
  const { mutate: remove, isSuccess: isRemove } = useDelete(`${id}`);
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isRemove) {
      navigate("/");
    }
  }, [isRemove]);
  return (
    <div>
      {data && (
        <div>
          <p>{data.author.username}</p>
          <p>{data.title}</p>
          <p>{data.contents}</p>
          <p>{data.updatedAt}</p>
        </div>
      )}
      <Button type="button" onClick={() => edit()}>
        edit
      </Button>
      <button onClick={() => remove()}>delete</button>
      <CommentsList />
    </div>
  );
}

export default Post;
