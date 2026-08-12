import React, { useState } from "react";
import { motion } from "framer-motion";

const title = "Post Your Property";

function PostProperty() {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "buy",
    location: "",
    price: "",
    image: "",
    owner: "",
    phone: "",
    email: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });

  const [properties, setProperties] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/BackEnd/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Property Posted Successfully!");

        setProperties((prev) => [...prev, data.property || form]);

        setForm({
          title: "",
          category: "buy",
          location: "",
          price: "",
          image: "",
          owner: "",
          phone: "",
          email: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          description: "",
        });

        setShowForm(false);
      } else {
        alert(data.message || "Failed to post property");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend.");
    }
  };

  return (
    <div className="pt-24 pb-15 mx-auto px-4 py-10 bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50">
      <motion.h2 className="text-3xl font-bold mb-10 text-center">
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={{
              y: [3, -3, 3],
              color: ["#000000", "#38bdf8", "#facc15", "#000000"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>

  <div className="max-w-7xl mx-auto px-4">
    {/* Centered Form */}
    {showForm && (
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-white p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              🏡 Property Details
              </h2>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="owner"
              placeholder="Owner Name"
              value={form.owner}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="area"
              placeholder="Area (e.g. 1200 sqft)"
              value={form.area}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Post Property
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Property Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {!showForm && (
        <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex items-center justify-center h-[420px]">
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-600 text-2xl font-bold hover:text-blue-700 transition"
          >
            + Add Property
          </button>
        </div>
      )}

      {properties.map((property, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
        >
          <div className="h-80 w-full">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold">{property.title}</h3>

            <p className="text-gray-600">📍 {property.location}</p>

            <p className="font-bold text-blue-600">
              {property.price}
            </p>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {property.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
    </div>
  );
}

export default PostProperty;