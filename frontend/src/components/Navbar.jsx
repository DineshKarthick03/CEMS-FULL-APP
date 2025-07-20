import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-400 shadow-sm sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between h-20">
      {/* Logo */}
      <Link to="/">
        <img
          src="/CEMS logo st.png"
          alt="CEMS Logo"
          className="h-12 w-auto object-contain"
        />
      </Link>

      {/* Title */}
      <div className="hidden sm:flex justify-center flex-1">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Campus Event Management System
        </h1>
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 bg-indigo-100 px-3 py-1.5 rounded hover:bg-indigo-200"
        >
          <span className="text-sm font-medium text-indigo-800">
            {user?.username}
          </span>
          <ChevronDown size={16} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
            {/* Close Button */}
            <div className="flex justify-end px-2 pt-1">
              <button
                onClick={() => setDropdownOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            <button
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
              onClick={() => {
                setDropdownOpen(false);
                alert("Profile coming soon!");
              }}
            >
              Profile
            </button>

            <button
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
