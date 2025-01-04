import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
