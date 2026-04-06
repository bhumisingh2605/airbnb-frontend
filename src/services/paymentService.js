import API from "./api";

// 💳 CREATE PAYMENT ORDER
export const createPayment = async (bookingId) => {
  const res = await API.post(`/payments/create/${bookingId}`);
  return res.data;
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (paymentData) => {
  const res = await API.post("/payments/verify", paymentData);
  return res.data;
};