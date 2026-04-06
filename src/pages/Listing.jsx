import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../services/bookingService";

function Listing() {
  const { id } = useParams();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("⚠️ Please select dates");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        checkInDate,
        checkOutDate
      };

      const res = await createBooking(payload);

      alert("✅ Booking Successful! ID: " + res.id);
    } catch (err) {
      console.error(err);
      alert("❌ Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔥 IMAGE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <img
          src="https://source.unsplash.com/800x500/?hotel"
          alt="hotel"
          className="rounded-xl w-full h-[350px] object-cover"
        />
        <div className="grid grid-cols-2 gap-4">
          <img src="https://source.unsplash.com/400x300/?room" className="rounded-xl h-full object-cover" />
          <img src="https://source.unsplash.com/400x300/?bedroom" className="rounded-xl h-full object-cover" />
          <img src="https://source.unsplash.com/400x300/?resort" className="rounded-xl h-full object-cover" />
          <img src="https://source.unsplash.com/400x300/?luxury-hotel" className="rounded-xl h-full object-cover" />
        </div>
      </div>

      {/* 🔥 DETAILS */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Luxury Hotel Stay</h1>
          <p className="text-gray-600 mb-4">📍 Prime Location • ⭐ 4.5 Rating</p>

          <p className="text-gray-700">
            Enjoy a premium stay with modern amenities, free WiFi, AC rooms,
            and beautiful city views.
          </p>
        </div>

        {/* RIGHT (BOOKING CARD) */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">

          <h2 className="text-xl font-semibold mb-4">
            ₹ 1200 <span className="text-sm text-gray-500">/ night</span>
          </h2>

          <div className="flex flex-col gap-3 mb-4">
            <input
              type="date"
              value={checkInDate}
              onChange={e => setCheckInDate(e.target.value)}
              className="border p-2 rounded-lg"
            />

            <input
              type="date"
              value={checkOutDate}
              onChange={e => setCheckOutDate(e.target.value)}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

        </div>
      </div>

    </div>
  );
}

export default Listing;