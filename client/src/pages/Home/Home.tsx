import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Home() {
  const { user, isLoggedIn } = useAuthStore();
  console.log(user);
  return (
    <div>
      <span>Home</span>
      {isLoggedIn && <span>{user?.username}</span>}
      <Link to={"/login"}>login</Link>
    </div>
  );
}

export default Home;
