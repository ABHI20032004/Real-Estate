import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { properties } from "../data/buy_properties";

const title = "Explore Our Exclusive Properties for Sale";


function Buy() {
     const [dbProperties, setDbProperties] = useState([]);
      
         useEffect(() => {
         fetch(`${import.meta.env.VITE_API_URL}/BackEnd/properties/buy`)
         .then((res) => res.json())
         .then((data) => {
          setDbProperties(data.properties || data);
         })
        .catch((err) => console.log(err));
        }, []);
    
          const allProperties = [...properties, ...dbProperties];
    
          const [location, setLocation] = useState("All");
      
          const filteredProperties = allProperties.filter((property) => {
          return (
            location === "All" ||
            property.location.toLowerCase().includes(location.toLowerCase())
          );
        });
    

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

       {/* Location Filter */}
      <div className="flex justify-center mb-8 ">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border border-gray-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Patna">Patna</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Pune">Pune</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
          <div
            key={property.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            {/* IMAGE */}
            <Link to={`/buy-property/${property.id}`}>
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
               ₹ {property.price}
              </p>
            </div>
          </div>
        ))
         ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            No properties found for this location.
          </div>
        )}
      </div>

    </div>
  );
}

export default Buy;