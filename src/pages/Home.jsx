import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      console.log("🚀 Calling API...");

      const response = await fetch(
        "http://airbnb-backend-env.eba-uj53pkte.us-east-1.elasticbeanstalk.com/api/v1/hotels"
      );

      const result = await response.json();

      console.log("🔥 API RESPONSE:", result);

      setProperties(result.content || []);
    } catch (error) {
      console.error("❌ API ERROR:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

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
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;