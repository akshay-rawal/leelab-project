import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { useAuthStore } from "./store/store";
import SignupPage from "./pages/Signup";
import { Loader } from "lucide-react";
import Layout from "./layout/Layout";
import AdminPanel from "./components/AdminPanel";
import AddProblem from "./pages/AddProblem";
import ProblemTable from "./components/ProblemTable";
const App = () => {
  const {authUser, isCheckingAuth,checkAuth} = useAuthStore()
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      checkAuth();
    }
  }, []);

if (isCheckingAuth && !authUser) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}


  return (
 
    <div className="flex flex-col items-center justify-start">
          <Toaster />
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={authUser?<Home/>:<Navigate to={"/login"}/>}/>
          <Route path = "/get-problems/:id" element={authUser?<ProblemTable/>: <Navigate to={"/"}/>}/>
        </Route>
        <Route element={<AdminPanel/>}>
        <Route path="/add-problem" element={authUser?<AddProblem/>: <Navigate to={"/"}/>}/>
        
        </Route>
        <Route path="/login" element={!authUser?<LoginPage/>: <Navigate to={"/"}/>}></Route>
        <Route path="/sign-up" element={!authUser?<SignupPage/> : <Navigate to={"/"}/>}></Route>
        <Route path="/" element={authUser?<Home/> : <Navigate to={"/login"}/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
