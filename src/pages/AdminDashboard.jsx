import React, { useEffect, useState } from "react";
import { getAllBookings, cancelBooking } from "../services/bookingService";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const data = await getAllBookings(); // ✅ FIXED

      console.log("📦 Admin Bookings:", data);

      setBookings(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ CANCEL BOOKING
  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      await cancelBooking(id);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  // 📊 STATS
  const totalBookings = bookings.length;

  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const activeBookings = bookings.filter(
    (b) => b.status !== "CANCELLED"
  ).length;

  // ⏳ LOADING
  if (loading) {
    return <p className="text-center mt-20">Loading dashboard...</p>;
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* 📊 STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white shadow rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h2 className="text-2xl font-bold">{totalBookings}</h2>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <p className="text-gray-500 text-sm">Active Bookings</p>
            <h2 className="text-2xl font-bold">{activeBookings}</h2>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-2xl font-bold">₹ {totalRevenue}</h2>
          </div>

        </div>

        {/* 📋 TABLE */}
        <div className="bg-white shadow rounded-xl p-5 overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Hotel</th>
                <th>User</th>
                <th>Dates</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((b) => (

                <tr key={b?.id} className="border-b hover:bg-gray-50">

                  <td className="py-3 font-medium">
                    {b?.hotelName || "Hotel"}
                  </td>

                  <td>{b?.userName || "User"}</td>

                  <td className="text-sm">
                    {b?.checkInDate} → {b?.checkOutDate}
                  </td>

                  <td>₹ {b?.totalPrice || 0}</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
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

export default AdminDashboard;