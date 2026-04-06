import React, { useEffect, useState } from "react";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      console.log("🚀 Calling API...");

      const res = await API.get("/properties");

      console.log("🔥 FULL RESPONSE:", res);
      console.log("🔥 DATA:", res.data);

      // ✅ IMPORTANT FIX
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setProperties(data);

    } catch (err) {
      console.error("❌ API ERROR:", err);

      // 🔥 FALLBACK (direct fetch)
      try {
        const res = await fetch(
          "http://localhost:8080/api/v1/properties"
        );
        const data = await res.json();

        console.log("🔥 FALLBACK DATA:", data);

        setProperties(data || []);
      } catch (e) {
        console.error("❌ FALLBACK FAILED:", e);
        setProperties([]);
      }

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Available Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-center text-red-500">
          ❌ No properties found (Check API)
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;