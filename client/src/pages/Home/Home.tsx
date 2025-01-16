import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useMe from "../../hooks/auth/useMe";
import useLogout from "../../hooks/auth/useLogout";

function Home() {
  const { data } = useMe();
  const { mutate } = useLogout();
  const token = localStorage.getItem("accessToken");
  const onClick = () => {
    mutate();
  };
  return (
    <div>
      <span>Home</span>
      {data && token ? (
        <div>
          <span>{data.user?.username}</span>
          <button onClick={onClick}>logout</button>
        </div>
      ) : (
        <Link to={"/login"}>login</Link>
      )}
    </div>
  );
}

export default Home;
