import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
export const useAuthStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    signup:async(credentials,navigate)=>{
        set({isSigningUp:true});
        try {
            const response=await axios.post("http://localhost:8000/api/v1/auth/signup",credentials,{
                withCredentials:true,
            });
            set({user:response.data.user,isSigningUp:false});
            toast.success("Account created successfully");
            navigate("/events"); // Redirect to events page after signup
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
        }
    },
    login:async(credentials,navigate)=>{
        set({isLoggingIn:true});
        try {
            const response=await axios.post("http://localhost:8000/api/v1/auth/login",credentials,{
                withCredentials:true,
            });
            set({user:response.data.user,isLoggingIn:false});
            toast.success("Logged in successfully");
            if (response.data.user.role === "admin") {
                navigate("/admin-events");
            } else {
                navigate("/events");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({ isLoggingIn: false, user: null });
        }
    },
    logout:async()=>{
        set({isLoggingOut:true});
        try {
            await axios.post("http://localhost:8000/api/v1/auth/logout",{},{
                withCredentials:true,
            });
            set({user:null,isLoggingOut:false});
            toast.success("Logged out successfully");
        } catch (error) {
            set({isLoggingOut:false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck:async()=>{
        set({isCheckingAuth:true});
        try {
            const response=await axios.get("http://localhost:8000/api/v1/auth/authCheck",{
                withCredentials:true,
            });
            set({user:response.data.user,isCheckingAuth:false});
        } catch (error) {
            set({isCheckingAuth:false,user:null});
            toast.error(error.response.data.message || "An error occurred");
            
        }
    }
}))