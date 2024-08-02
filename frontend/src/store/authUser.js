import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthUser = create((set) => ({
  user: null,
  isSignUp: false,
  isCheakingAuth: true,
  isLoggingOut: false,
  isLoggingin: false,
  signup: async (credential) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credential);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSignUp: false, user: null });
    }
  },

  login: async (credential) => {
    set({ isLoggingin: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credential);
      set({ user: response.data.user, isLoggingin: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingin: false, user: null });
      toast.error(error.response.data.message || "Login failed"); 
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully ");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  authCheak: async () => {
    set({ isCheakingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheak");
      set({ user: response.data.user, isCheakingAuth: false });
    } catch (error) {
      set({ user: null, isCheakingAuth: false });
      // toast.error(error.response.data.message || "An error occurred"); // page load krte hi error aata hai
    }
  },
}));
