import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">

      {/* ✅ SUCCESS ICON */}
      <div className="text-green-500 text-6xl mb-4">
        ✅
      </div>

      {/* 🎉 MESSAGE */}
      <h1 className="text-3xl font-bold mb-2">
        Payment Successful!
      </h1>

      <p className="text-gray-600 mb-6">
        Your booking has been confirmed 🎉
      </p>

      {/* 📄 DETAILS */}
      {state && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full max-w-md text-left">
          <p><strong>Property:</strong> {state.propertyName}</p>
          <p><strong>Guests:</strong> {state.guests}</p>
          <p><strong>Total Paid:</strong> ₹ {state.total}</p>
        </div>
      )}

      {/* 🔥 BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate("/my-bookings")}
          className="border px-6 py-2 rounded-lg"
        >
          My Bookings
        </button>
      </div>

    </div>
  );
}

export default PaymentSuccess;