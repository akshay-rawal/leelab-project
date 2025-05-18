  import {create} from "zustand"
  import axiosInstance from "../libs/axios"
  import toast from "react-hot-toast"

    
  export const useAuthStore =  create((set)=>({
      authUser:null,
      isSigninUp:false,
      isLogginIn:false,
      isCheckingAuth:false,

      checkAuth: async()=>{
          set({isCheckingAuth:true})

          try {
              const res = await axiosInstance.get("users/check-user")
              console.log("check auth------",res.data);
              set({authUser:res.data.user})
              
          } catch (error) {
              console.log("❌ Error checking auth",error);
                      set({authUser:null})

          }
          finally{
          set({isCheckingAuth:false})
          }
      },
  signup: async (data) => {
      set({ isSigninUp: true });
      try {
        const res = await axiosInstance.post("/users/register", data);

        set({ authUser: res.data.user });

        toast.success(res.data.message);
      } catch (error) {
        console.log("Error signing up", error);
        toast.error("Error signing up");
      } finally {
        set({ isSigninUp: false });
      }
    },

   login: async (data) => {
  set({ isLogginIn: true });

  try {
    const res = await axiosInstance.post("/users/login", data);

    // ✅ Save token from response
    const token = res.data.data?.accessToken;
    if (token) {
      localStorage.setItem("token", token); // store it
            console.log("✅ Token stored in localStorage");

    }

    set({ authUser: res.data.user });
    toast.success(res.data.message);
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error);
    toast.error("Error logging in");
  } finally {
    set({ isLogginIn: false });
  }
},


    logout: async () => {
  try {
    await axiosInstance.get("/users/logout");
    localStorage.removeItem("token"); // ✅ clear token
    set({ authUser: null });
    toast.success("Logout successful");
  } catch (error) {
    console.log("Error logging out", error);
    toast.error("Error logging out");
  }
}

  }));



