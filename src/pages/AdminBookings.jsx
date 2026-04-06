import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getAllBookings, cancelBooking } from "../services/bookingService";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const data = await getAllBookings(); // ✅ FIXED

      console.log("📦 Admin Bookings:", data);

      setBookings(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ CANCEL BOOKING
  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Cancel booking?");
    if (!confirmCancel) return;

    try {
      await cancelBooking(id);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          All Bookings
        </h1>

        <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th>Hotel</th>
                <th>User</th>
                <th>Dates</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((b) => (
                <tr key={b?.id} className="border-b">

                  <td>{b?.hotelName || "Hotel"}</td>
                  <td>{b?.userName || "User"}</td>

                  <td>
                    {b?.checkInDate} → {b?.checkOutDate}
                  </td>

                  <td>₹ {b?.totalPrice || 0}</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        b?.status === "CANCELLED"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {b?.status || "CONFIRMED"}
                    </span>
                  </td>

                  <td>
                    {b?.status !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminBookings;