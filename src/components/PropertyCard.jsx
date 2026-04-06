import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  // ✅ Safe fallback values
  const image =
    property.image || "https://source.unsplash.com/400x300/?hotel";
  const rating = property.rating || "New";
  const guests = property.guests || 2;
  const bedrooms = property.bedrooms || 1;
  const bathrooms = property.bathrooms || 1;

  return (
    <div
      onClick={() => navigate(`/listing/${property.id}`)}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
    >
      {/* 🖼️ IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={property.name}
          className="w-full h-52 object-cover transform hover:scale-110 transition duration-500"
        />

        {/* ❤️ WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* 📄 DETAILS */}
      <div className="p-4">

        {/* TITLE + RATING */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">
            {property.name || "Property"}
          </h2>

          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
            ⭐ {rating}
          </span>
        </div>

        {/* 📍 LOCATION */}
        <p className="text-gray-500 text-sm mt-1">
          {property.location || "Location"}
        </p>

        {/* 🛏️ INFO */}
        <p className="text-gray-500 text-sm mt-1">
          {guests} guests · {bedrooms} beds · {bathrooms} baths
        </p>

        {/* 💰 PRICE */}
        <p className="mt-3 font-bold text-lg">
          ₹ {property.price || 0}
          <span className="text-sm text-gray-500"> / night</span>
        </p>

        {/* 🔥 BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            navigate(`/listing/${property.id}`);
          }}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          View & Book
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;