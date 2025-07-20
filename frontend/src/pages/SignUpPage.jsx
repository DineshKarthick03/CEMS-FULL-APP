import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const searchParams = new URLSearchParams(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuthStore();
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    signup({ email, username, password },navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Left - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 min-h-screen">
        <img src="/CEMS logo st.png" alt="logo" className="h-20 sm:h-24 w-auto mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-1 text-black">Welcome!</h2>
        <p className="text-gray-600 mb-6">Register to connect with your Campus</p>

        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:outline-none focus:ring"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:outline-none focus:ring"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:outline-none focus:ring"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already an user?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right - Image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src="/CEMS.png"
          alt="CEMS image"
          className="max-h-full object-cover rounded-lg shadow-lg bg-indigo-200"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
