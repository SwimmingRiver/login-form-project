import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <span>Home</span>
      <Link to={"/login"}>login</Link>
    </div>
  );
}

export default Home;
