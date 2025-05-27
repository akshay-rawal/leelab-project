import { create } from "zustand";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axiosInstance.get("users/check-user");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      const { accessToken, user } = res.data.data;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }

      if (user) {
        set({ authUser: user });
        toast.success(res.data.message);
      }
      return user;
    } catch (error) {
      toast.error("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });

    try {
      const res = await axiosInstance.post("/users/login", data);

      const { accessToken, user } = res.data.data;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }

      if (user) {
        set({ authUser: user });
        toast.success(res.data.message);
      }

      return user;
    } catch (error) {
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
      toast.error("Error logging out");
    }
  },
}));
