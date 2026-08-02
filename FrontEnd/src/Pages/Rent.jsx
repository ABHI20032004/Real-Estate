import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { properties } from "../data/rent_properties";

const title = "Explore Our Exclusive Rental Properties";

function Rent() {
  return (
    <div className="pt-24 pb-15 px-6 md:px-16 bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50">

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE */}
            <Link to={`/rent-property/${property.id}`}>
              <div className="h-78 w-full overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* DETAILS */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {property.title}
              </h3>

              <p className="text-sm text-gray-600">
                📍 {property.location}
              </p>

              <p className="text-blue-600 font-bold mt-2">
                {property.price}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Rent;