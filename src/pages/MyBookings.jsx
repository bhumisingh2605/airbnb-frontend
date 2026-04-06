import React, { useEffect, useState } from "react";
import { getAllBookings } from "../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BOOKINGS
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      console.log("📦 Bookings:", data);

      setBookings(data || []);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return <p className="text-center mt-20">Loading bookings...</p>;
  }

  // ❌ NO BOOKINGS
  if (bookings.length === 0) {
    return (
      <p className="text-center mt-20 text-red-500">
        No bookings found
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">
              Booking ID: {booking?.id}
            </h2>

            <p className="mt-2">
              📅 Check-in: {booking?.checkInDate}
            </p>

            <p>
              📅 Check-out: {booking?.checkOutDate}
            </p>

            <p className="mt-2 text-green-600 font-semibold">
              ✅ Status: Confirmed
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;