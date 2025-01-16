import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useMe from "../../hooks/auth/useMe";

function Home() {
  const { data } = useMe();
  return (
    <div>
      <span>Home</span>
      {data ? (
        <span>{data.user?.username}</span>
      ) : (
        <Link to={"/login"}>login</Link>
      )}
    </div>
  );
}

export default Home;
