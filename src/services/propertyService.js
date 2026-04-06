import API from "./api";

// ✅ GET PROPERTIES (SAFE + DEBUG)
export const getProperties = async (filters = {}) => {
  try {
    const res = await API.get("/properties", {
      params: filters,
    });

    console.log("📦 RAW RESPONSE:", res);
    console.log("📦 DATA:", res.data);

    // ✅ Handle both formats
    if (Array.isArray(res.data)) {
      return res.data;
    }

    if (Array.isArray(res.data?.data)) {
      return res.data.data;
    }

    console.warn("⚠️ Unexpected format:", res.data);
    return [];

  } catch (error) {
    console.error("❌ getProperties ERROR:", error);
    throw error;
  }
};

// ✅ CREATE
export const createProperty = async (data) => {
  const res = await API.post("/properties", data);
  return res.data;
};

// ✅ UPDATE
export const updateProperty = async (id, data) => {
  const res = await API.put(`/properties/${id}`, data);
  return res.data;
};

// ✅ DELETE
export const deleteProperty = async (id) => {
  const res = await API.delete(`/properties/${id}`);
  return res.data;
};