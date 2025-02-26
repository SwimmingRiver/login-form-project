import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import Redirect from "./pages/Login/Redirect";
import NavBar from "./layouts/Navbar";
import Post from "./pages/Posts/Post";
import Write from "./pages/Write/Write";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="mainBody">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
