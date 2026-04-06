import API from "./api";

// ✅ LOGIN
export const login = async (loginData) => {
  try {
    const res = await API.post("/auth/login", loginData);

    console.log("✅ LOGIN RESPONSE:", res.data);

    const token = res.data.accessToken;

    if (!token) {
      throw new Error("No token received from backend");
    }

    // Save token
    localStorage.setItem("token", token);

    return res.data;

  } catch (error) {
    console.error("❌ Login Error:", error.response || error.message);
    throw error;
  }
};

// ✅ SIGNUP
export const signup = async (signupData) => {
  try {
    const res = await API.post("/auth/signup", signupData);

    console.log("✅ SIGNUP RESPONSE:", res.data);

    return res.data;

  } catch (error) {
    console.error("❌ Signup Error:", error.response || error.message);
    throw error;
  }
};

// ✅ CHECK IF USER IS LOGGED IN
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// ✅ LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

// ✅ GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};