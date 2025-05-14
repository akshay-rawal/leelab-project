import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  let authUser = null;
  return (
    <div className="flex flex-col items-center justify-start">
      <Routes>
        <Route path="/login" element={!authUser?<Login/>: <Navigate to={"/"}/>}></Route>
        <Route path="/sign-up" element={!authUser?<Signup/> : <Navigate to={"/"}/>}></Route>
        <Route path="/" element={authUser?<Home/> : <Navigate to={"/login"}/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
