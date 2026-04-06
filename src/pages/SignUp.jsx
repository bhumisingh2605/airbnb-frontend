import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await signup(form);

      alert("✅ Account created successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* 🔥 LEFT IMAGE SECTION */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/900x900/?travel,hotel')"
        }}
      ></div>

      {/* 🔥 RIGHT FORM */}
      <div className="flex justify-center items-center w-full md:w-1/2 p-6">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
          />

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl hover:scale-105 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* LOGIN REDIRECT */}
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-500 cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;