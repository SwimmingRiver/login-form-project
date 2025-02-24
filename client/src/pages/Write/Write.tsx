import React, { useEffect, useState } from "react";
import useCreate from "../../hooks/posts/useCreate";
import styles from "./Write.module.css";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const { mutate: write, isSuccess } = useCreate({
    title,
    contents,
    isPublished: true,
    publishedAt: new Date().toISOString(),
  });
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  const onClick = () => {
    write();
  };
  return (
    <div className={styles.wrapper}>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={styles.title}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={contents}
        onChange={(e) => {
          setContents(e.target.value);
        }}
        className={styles.contents}
        placeholder="내용을 입력하세요"
      />
      <button onClick={onClick} className={styles.writeButton}>
        작성하기
      </button>
    </div>
  );
}

export default Write;
