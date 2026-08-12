import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { properties } from "../data/rent_properties";

function RentPropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const staticProperty = properties.find(
    (item) => item.id === Number(id)
  );

  if (staticProperty) {
    setProperty(staticProperty);
    setLoading(false);
    return;
  }

  fetch(`${import.meta.env.VITE_API_URL}/BackEnd/properties/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProperty(data.property);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">
        Property Not Found
      </div>
    );
  }

  return (
    <div className=" mx-auto px-6 py-10 pt-24 bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[500px] object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-8">
        {property.title}
      </h1>

      <p className="text-xl text-gray-600 mt-2">
        📍 {property.location}
      </p>

      <p className="text-3xl font-bold text-blue-600 mt-4">
        {property.price.startsWith("₹")
          ? property.price
          : `₹ ${property.price}`}
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8 text-lg">
        <p>🛏 {property.bedrooms} Bedrooms</p>
        <p>🛁 {property.bathrooms} Bathrooms</p>
        <p>📐 {property.area} sqft</p>
      </div>

      <p className="mt-8 text-gray-700 leading-8">
        {property.description}
      </p>

      <div className="bg-gray-100 rounded-xl p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Owner Details
        </h2>

        <p><strong>Name:</strong> {property.owner}</p>
        <p><strong>Phone:</strong> {property.phone}</p>
        <p><strong>Email:</strong> {property.email}</p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Contact Owner
        </button>
      </div>
    </div>
  );
}

export default RentPropertyDetails;