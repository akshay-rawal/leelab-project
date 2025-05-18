import React from 'react'
import { useAuthStore } from '../store/store'
import { Navigate,Outlet } from 'react-router-dom'


const AdminPanel = () => {
    const {authUser,isCheckingAuth} = useAuthStore()

    if (isCheckingAuth && !authUser) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}

if(!authUser || authUser.role !== "ADMIN"){
     return <Navigate to="/"/>
}

  return (
    <div><Outlet/></div>
  )
}

export default AdminPanel