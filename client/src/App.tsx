import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import Redirect from "./pages/Login/Redirect";
import NavBar from "./layouts/Navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
