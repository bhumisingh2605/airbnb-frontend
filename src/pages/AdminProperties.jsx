import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  getProperties,
  createProperty,
  deleteProperty,
} from "../services/propertyService";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
  });

  // ✅ Load properties
  const loadProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add property
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProperty({
      ...form,
      price: Number(form.price),
    });

    setForm({ name: "", location: "", price: "" });
    loadProperties();
  };

  // ✅ Delete property
  const handleDelete = async (id) => {
    await deleteProperty(id);
    loadProperties();
  };

  return (
    <AdminLayout>
      <h2>🏠 Admin Properties</h2>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Property Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">Add Property</button>
      </form>

      {/* LIST */}
      <div>
        {properties.map((p) => (
          <div key={p.id} style={{ marginTop: "10px" }}>
            <h4>{p.name}</h4>
            <p>{p.location}</p>
            <p>₹{p.price}</p>

            <button onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;