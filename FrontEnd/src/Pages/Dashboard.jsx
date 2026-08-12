import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";


const headlines = [
  { title: "Find Your Dream Home", color: "text-blue-400" },
  { title: "Luxury Living Redefined", color: "text-yellow-400" },
  { title: "Invest Smartly in Real Estate", color: "text-green-400" },
  { title: "Live Your Dream", color: "text-green-400" },
];

const videos = ["/v2.mp4", "/v1.mp4", "/v2.mp4", "/v3.mp4"];


////  Components

function Dashboard() {
  const [textIndex, setTextIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 27000);
    return () => clearInterval(interval);
  }, [textIndex]);

  const nextSlide = () => {
    setTextIndex((p) => (p + 1) % headlines.length);
    setVideoIndex((p) => (p + 1) % videos.length);
  };

  const prevSlide = () => {
    setTextIndex((p) => (p - 1 + headlines.length) % headlines.length);
    setVideoIndex((p) => (p - 1 + videos.length) % videos.length);
  };

  const properties_buy = [
  {
    title: "Luxury Villa in Beverly Hills",
    location: "Delhi",
    price: "₹ 4,500,000",
    image: "/images/buy6.png",
  },
  {
    title: "Modern Apartment",
    location: "Mumbai",
    price: "₹ 2,800,000",
    image: "/images/buy7.png",
  },
  {
    title: "Beachside Bungalow",
    location: "Goa",
    price: "₹ 6,200,000",
    image: "/images/buy8.png",
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
];

  const properties_rent = [
  {
    title: "Modern Apartment",
    location: "Mumbai",
    price: "₹ 2,800,000",
    image: "/images/rent2.png",
  },
  {
    title: "Beachside Bungalow",
    location: "Goa",
    price: "₹ 6,200,000",
    image: "/images/rent3.png",
  },
  {
    title: "Independent House",
    location: "Hyderabad",
    price: "₹ 3,200,000",
    image: "/images/rent6.png",
  },
    {
    title: "Premium Penthouse",
    location: "Pune",
    price: "₹ 5,100,000",
    image: "/images/rent7.png",
  },
  {
    title: "Independent House",
    location: "Hyderabad",
    price: "₹ 3,200,000",
    image: "/images/rent9.png",
  },
];

const title = "Homes That Define Modern Living";

  return (
    <>
      {/*  HERO Section*/}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            src={videos[videoIndex]}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="absolute z-30 text-white w-full bottom-[5%] flex flex-col justify-center items-center text-center ">
          <AnimatePresence mode="wait">
            <motion.h1
              key={textIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {headlines[textIndex].title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={`${i === 2 ? headlines[textIndex].color : ""} mr-2`}
                >
                  {word}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>

          <p className="text-gray-100 mb-6 text-lg">
            Explore premium properties — buy, rent, or sell with confidence.
          </p>

        </div>

        <div className="absolute left-4 inset-y-0 flex items-center z-50">
          <button onClick={prevSlide}>
            <ArrowLeft className="text-blue-500" />
          </button>
        </div>

        <div className="absolute right-4 inset-y-0 flex items-center z-50">
          <button onClick={nextSlide}>
            <ArrowRight className="text-blue-500" />
          </button>
        </div>
      </div>

      {/* FEATURED PROPERTIES  */}
      <div className="pt-5 pb-2 px-4 bg-white">

          {/* Animated Heading */}
          <motion.h2 className="text-3xl font-bold mb-5 text-center">
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


      {/* Buy Section */}
      <div className=" bg-sky-800 rounded-t-2xl text-white text-2xl p-1 overflow-hidden">
            <motion.p
              className=""
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear",
              }}
            >
              Properties for Sell &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;Properties for Sell
            </motion.p>
      </div>
      <div className=" p-8 rounded-b-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  bg-linear-to-r from-blue-200 via-cyan-200 to-yellow-50 animate-gradient">
        {properties_buy.map((property, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE DIV */}
            <Link to="/buy">
            <div className="h-78 w-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            </Link>

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
          <div className="overflow-hidden flex justify-center items-center">
            <motion.a
              href="/buy"
              className="block max-w-sm p-6 rounded-2xl cursor-pointer text-white shadow-lg text-2xl"
              animate={{
                y: [20, -23 ,20], // vertical motion
                color: ["#000000", "#38bdf8", "#facc15", "#000000"], // color loop
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {"Explore More ➜"}
            </motion.a>
          </div>

      </div>

      {/* Rent Section */}
      <div className="mt-8 bg-sky-800 rounded-t-2xl text-white text-2xl p-1 overflow-hidden">
            <motion.p
              className=""
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear",
              }}
            >
              Properties for Rent &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;Properties for Rent
            </motion.p>
      </div>
      <div className="mb-5 p-8 rounded-b-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  bg-linear-to-r from-blue-200 via-cyan-200 to-yellow500 ">
        {properties_rent.map((property, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE DIV */}
            <Link to="/rent">
            <div className="h-78 w-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            </Link>

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
          <div className="overflow-hidden flex justify-center items-center">
            <motion.a
              href="/rent"
              className="block max-w-sm p-6 rounded-2xl cursor-pointer text-white shadow-lg text-2xl"
              animate={{
                y: [20, -23 ,20], // vertical motion
                color: ["#000000", "#38bdf8", "#facc15", "#000000"], // color loop
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {"Explore More ➜"}
            </motion.a>
          </div>
      </div>
      
    </div>
    </>
 );
}

export default Dashboard;
