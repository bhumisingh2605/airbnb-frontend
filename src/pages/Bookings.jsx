import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createPayment,
  verifyPayment
} from "../services/paymentService";
import { createBooking } from "../services/bookingService";

function Bookings() {
  const { state: property } = useLocation();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!property) {
    return <p className="text-center mt-10">No property selected</p>;
  }

  // 🧮 Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * property.price;
  const finalAmount = totalPrice + 200;

  // 💳 HANDLE BOOKING + PAYMENT
  const handleBooking = async () => {
    try {
      if (!checkIn || !checkOut) {
        alert("Please select dates");
        return;
      }

      if (nights <= 0) {
        alert("Invalid date selection");
        return;
      }

      setLoading(true);

      // 🔥 1. CREATE BOOKING
      const booking = await createBooking({
        propertyId: property.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests: guests
      });

      // 🔥 2. CREATE PAYMENT ORDER
      const order = await createPayment(booking.id);

      const user = JSON.parse(localStorage.getItem("user"));

      const options = {
        key: "rzp_test_SYGmyMB71qxqKc",
        amount: order.amount,
        currency: order.currency,
        name: "Airbnb Clone",
        description: property.name,
        order_id: order.orderId,

        // ✅ SUCCESS HANDLER
        handler: async function (response) {
          try {
            // 🔥 VERIFY PAYMENT
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id
            });

            // ✅ REDIRECT
            navigate("/payment-success", {
              state: {
                propertyName: property.name,
                total: finalAmount,
                checkIn,
                checkOut
              }
            });

          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@email.com"
        },

        theme: {
          color: "#F43F5E"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* 🏨 LEFT SIDE */}
      <div>
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-80 object-cover rounded-2xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-2">
          {property.name}
        </h1>

        <p className="text-gray-500 mb-4">
          {property.category} · Prime Location
        </p>

        <p className="text-gray-600">
          Comfortable stay · Free WiFi · AC · 24/7 Support
        </p>
      </div>

      {/* 💳 RIGHT SIDE */}
      <div className="border p-6 rounded-2xl shadow-lg h-fit sticky top-20">

        <h2 className="text-2xl font-semibold mb-4">
          ₹ {property.price} / night
        </h2>

        {/* 📅 DATE */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-3 rounded-xl"
          />
        </div>

        {/* 👥 GUESTS */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border p-3 rounded-xl mt-1"
          />
        </div>

        {/* 💰 PRICE */}
        <div className="border-t pt-4 mb-4 text-sm text-gray-600">

          <div className="flex justify-between">
            <span>₹ {property.price} × {nights} nights</span>
            <span>₹ {totalPrice}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Service fee</span>
            <span>₹ 200</span>
          </div>

          <div className="flex justify-between mt-2 font-semibold text-black">
            <span>Total</span>
            <span>₹ {finalAmount}</span>
          </div>

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

      </div>

    </div>
  );
}

export default Bookings;