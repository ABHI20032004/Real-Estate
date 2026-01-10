import React from "react";
import { motion } from "framer-motion";

const properties = [
  {
    title: "Luxury Villa in Beverly Hills",
    location: "Delhi",
    price: "₹ 4,500,000",
    image: "/images/buy1.png",
  },
  {
    title: "Modern Apartment",
    location: "Mumbai",
    price: "₹ 2,800,000",
    image: "/images/buy2.png",
  },
  {
    title: "Beachside Bungalow",
    location: "Goa",
    price: "₹ 6,200,000",
    image: "/images/buy3.png",
  },
  {
    title: "Smart Home Villa",
    location: "Bangalore",
    price: "₹ 3,900,000",
    image: "/images/buy4.png",
  },
  {
    title: "Premium Penthouse",
    location: "Pune",
    price: "₹ 5,100,000",
    image: "/images/buy5.png",
  },
  {
    title: "Independent House",
    location: "Hyderabad",
    price: "₹ 3,200,000",
    image: "/images/buy6.png",
  },
    {
    title: "Premium Penthouse",
    location: "Pune",
    price: "₹ 5,100,000",
    image: "/images/buy7.png",
  },
  {
    title: "Independent House",
    location: "Hyderabad",
    price: "₹ 3,200,000",
    image: "/images/buy8.png",
  },
  {
    title: "Independent House",
    location: "Bihar",
    price: "₹ 3,200,000",
    image: "/images/buy9.png",
  },
];
const title = "Explore Our Exclusive Properties for Sale";

function Buy() {
  return (
    <div className="pt-24 pb-15 px-6 md:px-16 bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50">
            <motion.h2 className="text-3xl font-bold mb-10 text-center">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [3, -3, 3], // vertical motion
                  color: ["#000000", "#38bdf8", "#facc15", "#000000"], // color loop
                }}
                transition={{
                  duration: 4,        // overall duration of one cycle
                  repeat: Infinity,   // loop infinitely
                  ease: "easeInOut",
                  delay: i * 0.1,     // stagger letters
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE DIV */}
            <a href="">
            <div className="h-78 w-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            </a>

            {/* DETAILS DIV */}
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

export default Buy;
