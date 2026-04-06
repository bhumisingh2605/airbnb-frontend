import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-pink-500 cursor-pointer"
      >
        Airbnb Clone
      </h1>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-pink-500">Home</Link>

        {loggedIn && (
          <>
            {/* ✅ ADD DASHBOARD */}
            <Link to="/dashboard" className="hover:text-pink-500">
              Dashboard
            </Link>

            <Link to="/bookings" className="hover:text-pink-500">
              Bookings
            </Link>

            {/* ✅ OPTIONAL ADMIN */}
            <Link to="/admin" className="hover:text-pink-500">
              Admin
            </Link>
          </>
        )}

        {!loggedIn ? (
          <>
            <Link to="/login" className="border px-4 py-2 rounded-lg hover:bg-gray-100">
              Login
            </Link>

            <Link to="/signup" className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
              Signup
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>

            {/* AVATAR */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border px-3 py-2 rounded-full cursor-pointer hover:shadow-md"
            >
              <span className="text-xl">☰</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border">

                {/* ✅ DASHBOARD */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </button>

                {/* ✅ BOOKINGS */}
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Bookings
                </button>

                {/* ✅ ADMIN */}
                <button
                  onClick={() => navigate("/admin")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Admin Panel
                </button>

                {/* ✅ LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;