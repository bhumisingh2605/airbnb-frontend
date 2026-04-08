import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Bookings from "./pages/Bookings";
import MyBookings from "./pages/MyBookings"; // ✅ FIXED

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PaymentSuccess from "./pages/PaymentSuccess";
import PropertyDetails from "./pages/PropertyDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminProperties from "./pages/AdminProperties";

import Navbar from "./components/Navbar";
import { isAuthenticated } from "./services/authService";

// 🔒 Protected Route
const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>

      {/* ✅ NAVBAR */}
      <Navbar />

      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* ✅ PROPERTY DETAILS */}
        <Route path="/book/:id" element={<PropertyDetails />} />

        {/* 🔒 USER ROUTES */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute>
              <AdminProperties />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;