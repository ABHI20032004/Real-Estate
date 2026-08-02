import React, { useState } from "react";
import { motion } from "framer-motion";

const title = "Sell Your Property";

function Sell() {

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: ""
  });

  const [properties, setProperties] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        image: reader.result
      });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProperties([...properties, form]);

    setForm({
      title: "",
      location: "",
      price: "",
      image: ""
    });

    setShowForm(false);
  };

  return (
    <div className="pt-24 pb-15 px-6 md:px-16 bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50">

      {/* Animated Title (Same as Buy) */}
      <motion.h2 className="text-3xl font-bold mb-10 text-center">
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={{
              y: [3, -3, 3],
              color: ["#000000", "#38bdf8", "#facc15", "#000000"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>

      {/* GRID SAME AS BUY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* ADD PROPERTY CARD */}
        {!showForm && (
          <div
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white flex items-center justify-center h-78"
          >
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 font-semibold text-lg hover:underline"
            >
              + Add Property
            </button>
          </div>
        )}

        {/* FORM CARD */}
        {showForm && (
          <div className="rounded-xl overflow-hidden shadow-md bg-white p-6">

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                name="title"
                placeholder="Property Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

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
                type="text"
                name="price"
                placeholder="Price"
                value={form.price}
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

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Submit
              </button>

            </form>

          </div>
        )}

        {/* PROPERTY CARDS */}
        {properties.map((property, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            <div className="h-78 w-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pl-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600">
                {property.location}
              </p>
              <p className="text-blue-600 font-bold mb-1">
                {property.price}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sell;