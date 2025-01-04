import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form>
      <span>login form</span>
      <input />
      <input />
      <button>submit</button>
      <Link to={"/signup"}>sign up</Link>
    </form>
  );
}

export default LoginForm;
