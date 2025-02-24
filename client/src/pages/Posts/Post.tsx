import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useReadPost from "../../hooks/posts/useReadPost";
import useEdit from "../../hooks/posts/useEdit";
import useDelete from "../../hooks/posts/useDelete";
import { Button } from "@chakra-ui/react";
import CommentsList from "../Comments/CommentsList";
import { useUserStore } from "../../store/authStore";
import styles from "./Post.module.css";
function Post() {
  const { id } = useParams();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContents, setEditedContents] = useState("");
  const navigate = useNavigate();
  const { data, refetch } = useReadPost(`${id}`);
  const { mutate: edit, isSuccess } = useEdit(`${id}`, {
    title: editedTitle,
    contents: editedContents,
  });
  const { mutate: remove, isSuccess: isRemove } = useDelete(`${id}`);
  const { user } = useUserStore();
  const [isEdit, setIsEdit] = useState(false);

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
  const onClickEditButton = useCallback(() => {
    setIsEdit((prev: boolean) => !prev);
    if (isEdit) {
      edit();
    }
  }, [isEdit]);
  return (
    <div>
      {data && (
        <div className={styles.postWrapper}>
          <div className={styles.headerWrapper}>
            {isEdit ? (
              <input
                placeholder="제목을 입력하세요"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <p>{data.title}</p>
            )}
            <p>{data.author.username}</p>
          </div>
          <div>
            {isEdit ? (
              <textarea
                placeholder="내용을 입력하세요"
                value={editedContents}
                onChange={(e) => {
                  setEditedContents(e.target.value);
                }}
              />
            ) : (
              <p>{data.contents}</p>
            )}
          </div>
          <p>{data.updatedAt}</p>
        </div>
      )}
      {data?.author?._id === user?.sub && (
        <div>
          <Button type="button" onClick={() => onClickEditButton()}>
            edit
          </Button>
          <button onClick={() => remove()}>delete</button>
        </div>
      )}

      <CommentsList />
    </div>
  );
}

export default Post;
