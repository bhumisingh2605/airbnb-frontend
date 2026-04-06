import axios from "axios";

// ✅ DEBUG (MUST print correct URL)
console.log("🌐 API URL:", import.meta.env.VITE_API_URL);

// ✅ FALLBACK (VERY IMPORTANT 🔥)
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

// ✅ Create instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Attach JWT token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle response errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // 🔐 Handle 401
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes?.data?.accessToken;

        if (!newToken) throw new Error("No token");

        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);

      } catch (refreshError) {
        console.log("❌ Session expired");

        localStorage.removeItem("token");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;