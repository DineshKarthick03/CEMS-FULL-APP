import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,

  signup: async (credentials, navigate) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "https://cems-full-app.onrender.com/api/v1/auth/signup",
        credentials
      );

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, isSigningUp: false });
      toast.success("Account created successfully");
      navigate("/events");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials, navigate) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "https://cems-full-app.onrender.com/api/v1/auth/login",
        credentials
      );

      const { user, token } = response.data;
      localStorage.setItem("token", token);
      set({ user, isLoggingIn: false });
      toast.success("Logged in successfully");
      if (user.role === "admin") navigate("/admin-events");
      else navigate("/events");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      localStorage.removeItem("token");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        "https://cems-full-app.onrender.com/api/v1/auth/authCheck",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));
