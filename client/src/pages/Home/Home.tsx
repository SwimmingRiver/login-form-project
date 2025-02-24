import { Link, useNavigate } from "react-router-dom";
import useReadList from "../../hooks/posts/useReadList";

import { Button } from "@chakra-ui/react";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const { data: list, isLoading, refetch } = useReadList(1, 10);
  const { data, totalItems, currentPage, totalPages } = list || {};

  type post = {
    _id: string;
    title: string;
    author: {
      id: string;
      username: string;
    };
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className={styles.wrapper}>
      <Button className={styles.toWrite} onClick={() => navigate("/write")}>
        write
      </Button>
      {data?.map((item: post) => (
        <Link to={`/posts/${item._id}`} key={item._id}>
          <div>
            {item.title}/{item.author.username}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
