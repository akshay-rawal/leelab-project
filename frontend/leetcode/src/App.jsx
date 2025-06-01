import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup"; 
import Layout from "./layout/Layout";
import AdminPanel from "./components/AdminPanel";
import AddProblem from "./pages/AddProblem";
import { ProblemPage } from "./pages/ProblemPage";                               
import { useAuthStore } from "./store/store";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) checkAuth();
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
        {/* Authenticated Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={authUser ? <HomePage/> : <Navigate to="/login" />} />
          <Route path="get-problems/:id" element={authUser ? <ProblemPage /> : <Navigate to="/" />} />
        </Route>

        {/* Admin Routes (optional: add Layout if needed) */}
        <Route path="/add-problem" element={authUser ? <AddProblem /> : <Navigate to="/" />} />

        {/* Auth Routes */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/sign-up" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
