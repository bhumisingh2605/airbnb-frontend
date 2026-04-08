import axios from "axios";

// Base URL of your Spring Boot backend
const BASE_URL = "http://airbnb-backend-env.eba-uj53pkte.us-east-1.elasticbeanstalk.com/api/v1";

// Create axios instance (recommended)
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


// ✅ 1. Get all hotels (pagination)
export const getAllHotels = (page = 0, size = 10) => {
    return api.get(`/hotels?page=${page}&size=${size}`);
};


// ✅ 2. Search hotels
export const searchHotels = (city, page = 0, size = 10) => {
    return api.get(`/hotels/search?city=${city}&page=${page}&size=${size}`);
};


// ✅ 3. Get hotel by ID
export const getHotelById = (id) => {
    return api.get(`/hotels/${id}`);
};


// ✅ 4. Book hotel
export const bookHotel = (bookingData) => {
    return api.post(`/bookings`, bookingData);
};


export default api;