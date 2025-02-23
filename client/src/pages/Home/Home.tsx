import { Link } from "react-router-dom";
import useReadList from "../../hooks/posts/useReadList";
import { PostInterface } from "../../types/posts";
import useCreate from "../../hooks/posts/useCreate";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

function Home() {
  const { data: list, isLoading, refetch } = useReadList(1, 10);
  const { data, totalItems, currentPage, totalPages } = list || {};
  const { mutate: write, isSuccess } = useCreate({
    title: "hihi",
    contents: "hhhh",
    isPublished: true,
    publishedAt: new Date().toISOString(),
  });
  type post = {
    _id: string;
    title: string;
    author: {
      id: string;
      username: string;
    };
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <span>home</span>
      <Button onClick={() => write()}>write</Button>
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
