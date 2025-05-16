import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthStore } from "./store/store";

const App = () => {
  const {authUser, isCheckingAuth,checkAuth} = useAuthStore()

  return (
 
    <div className="flex flex-col items-center justify-start">
          <Toaster />
      <Routes>
        <Route path="/login" element={!authUser?<Login/>: <Navigate to={"/"}/>}></Route>
        <Route path="/sign-up" element={!authUser?<Signup/> : <Navigate to={"/"}/>}></Route>
        <Route path="/" element={authUser?<Home/> : <Navigate to={"/login"}/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
