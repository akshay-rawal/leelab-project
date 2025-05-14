import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/sign-up" element={<Signup/>}></Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
