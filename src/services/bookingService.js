import API from "./api";

// ✅ CREATE BOOKING (INIT STEP)
export const createBooking = async (bookingData) => {
  try {
    const response = await API.post("/bookings/init", bookingData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating booking:", error.response?.data || error);
    throw error;
  }
};

// ✅ ADD GUESTS (STEP 2)
export const addGuests = async (bookingId, guests) => {
  try {
    const response = await API.post(
      `/bookings/${bookingId}/addGuests`,
      guests
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error adding guests:", error.response?.data || error);
    throw error;
  }
};

// ✅ INITIATE PAYMENT (STEP 3)
export const initiatePayment = async (bookingId) => {
  try {
    const response = await API.post(
      `/bookings/${bookingId}/payments`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error initiating payment:", error.response?.data || error);
    throw error;
  }
};

// ✅ CANCEL BOOKING
export const cancelBooking = async (bookingId) => {
  try {
    const response = await API.post(
      `/bookings/${bookingId}/cancel`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error cancelling booking:", error.response?.data || error);
    throw error;
  }
};

// ✅ GET ALL BOOKINGS
export const getAllBookings = async () => {
  try {
    const response = await API.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.response?.data || error);
    throw error;
  }
};