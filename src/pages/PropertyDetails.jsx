import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { createBooking } from "../services/bookingService";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PROPERTY
  useEffect(() => {
    console.log("📌 Property ID:", id);

    API.get(`/properties/${id}`)
      .then((res) => {
        console.log("🔥 PROPERTY DATA:", res.data);
        setProperty(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching property:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ BOOKING + PAYMENT FLOW
  const handleBooking = async () => {
    try {
      if (!property) {
        alert("Property not loaded");
        return;
      }

      const bookingData = {
        propertyId: property.id,

        // ✅ FIXED FIELD NAMES (VERY IMPORTANT)
        checkInDate: "2026-04-10",
        checkOutDate: "2026-04-12",

        guests: property.guests || 2,
      };

      console.log("📤 Sending booking:", bookingData);

      // ✅ STEP 1: CREATE BOOKING (calls /bookings/init)
      const res = await createBooking(bookingData);

      console.log("✅ Booking Created:", res);

      alert("✅ Booking Created! Proceeding to payment...");

      // ✅ STEP 2: OPEN PAYMENT
      openRazorpay();

    } catch (err) {
      console.error("❌ Booking Error:", err.response?.data || err);
      alert("❌ Booking Failed");
    }
  };

  // ✅ RAZORPAY FUNCTION
  const openRazorpay = () => {
    if (!window.Razorpay) {
      alert("❌ Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_SZ6jIvubdG3uDL", // 🔥 replace with your key
      amount: (property.price || 5000) * 100,
      currency: "INR",
      name: "Airbnb Clone",
      description: "Property Booking",

      handler: function (response) {
        console.log("✅ Payment Success:", response);

        alert("🎉 Payment Successful!");

        navigate("/payment-success", {
          state: {
            propertyName: property.name,
            guests: property.guests || 2,
            total: property.price || 5000,
          },
        });
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ⏳ LOADING
  if (loading) {
    return <p className="text-center mt-20">Loading property...</p>;
  }

  // ❌ NOT FOUND
  if (!property) {
    return <p className="text-center mt-20">Property not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* 🖼️ IMAGE */}
      <img
        src={
          property.image ||
          "https://via.placeholder.com/800x400?text=No+Image"
        }
        alt={property.name}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      {/* 🏠 TITLE */}
      <h1 className="text-3xl font-bold">
        {property.name}
      </h1>

      {/* 📍 LOCATION */}
      <p className="text-gray-500 mt-2">
        {property.location}
      </p>

      {/* ⭐ RATING */}
      <p className="mt-2">
        ⭐ {property.rating || "New"} · {property.reviews || 0} reviews
      </p>

      {/* 🛏️ DETAILS */}
      <p className="mt-2 text-gray-600">
        {property.guests || 2} guests ·{" "}
        {property.bedrooms || 1} bedrooms ·{" "}
        {property.bathrooms || 1} bathrooms
      </p>

      {/* 📝 DESCRIPTION */}
      <p className="mt-4">
        {property.description || "No description available"}
      </p>

      {/* 💰 PRICE */}
      <p className="text-2xl font-bold mt-4">
        ₹ {property.price || 5000} / night
      </p>

      {/* 🔥 BOOK BUTTON */}
      <button
        onClick={handleBooking}
        className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Book Now
      </button>

    </div>
  );
}

export default PropertyDetails;
