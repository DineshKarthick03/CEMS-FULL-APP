import { Navigate, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EventsPage from "./pages/EventsPage"
import AdminEventsPage from "./pages/AdminEventsPage"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"


function App() {
  const {user,isCheckingAuth,authCheck}=useAuthStore();
  useEffect(()=>{
    authCheck();
  },[]);
  
  console.log("User:", user);
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <Loader className="animate-spin text-blue-600 size-8" />
      </div>
    );
  }

  return (
  <> 
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? (user.role === "admin" ? "/admin-events" : "/events") : "/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/events"
          element={user?.role === "user" ? <EventsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-events"
          element={user?.role === "admin" ? <AdminEventsPage /> : <Navigate to="/" />}
        />
      </Routes>
    <Toaster/> 
  </>  
  )
}

export default App
