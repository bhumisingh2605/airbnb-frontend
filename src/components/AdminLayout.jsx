import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Properties", path: "/admin/properties" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🧭 SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5">

        <h2 className="text-2xl font-bold mb-8 text-pink-500">
          Admin Panel
        </h2>

        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block p-3 rounded-lg ${
                  location.pathname === item.path
                    ? "bg-pink-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

      </div>

      {/* 📦 CONTENT */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;