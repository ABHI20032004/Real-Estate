import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const title = "My Properties";

function MyProperties() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  //// FETCH USER PROPERTIES FROM DATABASE


  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    console.log("Current User:", currentUser);
    console.log("Username:", currentUser?.username);

    fetch(
      `${import.meta.env.VITE_API_URL}/BackEnd/properties/my-properties?owner=${currentUser.username}`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        return res.json();
      })
      .then((data) => {
        console.log("My properties:", data);

        setProperties(data.properties || data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching my properties:", err);
        setLoading(false);
      });
  }, [currentUser]);


  // FILTER ALL / BUY / RENT

  const filteredProperties = properties.filter((property) => {
    if (filter === "All") {
      return true;
    }

    return property.category === filter.toLowerCase();
  });

  // DELETE PROPERTY

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/BackEnd/properties/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete property");
      return;
    }

    // Remove deleted property from UI
    setProperties((prevProperties) =>
      prevProperties.filter(
        (property) => property.id !== id
      )
    );

    alert("Property deleted successfully");

  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong while deleting property");
  }
};

  //// GET PROPERTY TYPE

  const getPropertyType = (property) => {
    const type = (
      property.type ||
      property.listingType ||
      property.purpose ||
      ""
    ).toLowerCase();

    if (
      type === "buy"
    ) {
      return "Buy";
    }

    if (
      type === "rent" 
    ) {
      return "Rent";
    }

    return "Property";
  };

  // NOT LOGGED IN

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-gradient-to-r from-blue-200 via-cyan-200 to-yellow-50">

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-bold text-gray-800">
            Login Required
          </h2>

          <p className="text-gray-500 mt-3">
            Please login to view your properties.
          </p>

          <Link
            to="/signin"
            className="inline-block mt-6 bg-sky-800 text-white
                       px-6 py-3 rounded-lg font-semibold
                       hover:bg-sky-700 transition"
          >
            Login
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="pt-24 pb-15 px-6 md:px-16
                    bg-gradient-to-r from-blue-200
                    via-cyan-200 to-yellow-50
                    min-h-screen">


      {/* Title */}

      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={{
              y: [3, -3, 3],
              color: [
                "#000000",
                "#38bdf8",
                "#facc15",
                "#000000",
              ],
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


      {/*  FILTER + POST PROPERTY */}

      <div className="flex flex-col md:flex-row
                      justify-between items-center
                      gap-5 mb-10">


        {/* FILTER BUTTONS */}

        <div className="flex gap-3">

          {/* ALL */}

          <button
            onClick={() => setFilter("All")}
            className={`px-6 py-2 rounded-lg
                        font-semibold transition ${
                          filter === "All"
                            ? "bg-sky-800 text-white shadow-lg"
                            : "bg-white text-gray-700 border hover:bg-sky-100"
                        }`}
          >
            All
          </button>


          {/* BUY */}

          <button
            onClick={() => setFilter("Buy")}
            className={`px-6 py-2 rounded-lg
                        font-semibold transition ${
                          filter === "Buy"
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-white text-gray-700 border hover:bg-green-100"
                        }`}
          >
            Buy
          </button>


          {/* RENT */}

          <button
            onClick={() => setFilter("Rent")}
            className={`px-6 py-2 rounded-lg
                        font-semibold transition ${
                          filter === "Rent"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 border hover:bg-blue-100"
                        }`}
          >
            Rent
          </button>

        </div>

      </div>


      {/*  LOADING */}

      {loading && (
        <div className="text-center py-20">

          <p className="text-gray-600 text-lg">
            Loading your properties...
          </p>

        </div>
      )}


      {/*  PROPERTY GRID */}

      {!loading && (
        <div className="grid grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-8">

          {filteredProperties.length > 0 ? (

            filteredProperties.map((property) => {

              const propertyId =
                 property.id;

              const propertyType =
                getPropertyType(property);

              const isRent =
                propertyType === "Rent";

              return (
                <motion.div
                  key={propertyId}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="rounded-xl overflow-hidden
                             shadow-md hover:shadow-xl
                             transition bg-white"
                >

                  {/*  IMAGE */}

                  <Link
                    to={
                      isRent
                        ? `/rent-property/${propertyId}`
                        : `/buy-property/${propertyId}`
                    }
                  >

                    <div className="h-72 w-full
                                    overflow-hidden
                                    relative">

                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full
                                   object-cover
                                   cursor-pointer
                                   hover:scale-105
                                   transition-transform
                                   duration-300"
                      />

                    </div>

                  </Link>


                  {/*  DETAILS */}

                  <div className="p-4">

                    <h3 className="text-lg
                                   font-semibold
                                   text-gray-900">
                      {property.title}
                    </h3>


                    <p className="text-sm
                                  text-gray-600 mt-1">
                      📍 {property.location}
                    </p>


                    <p className="text-blue-600
                                  font-bold mt-2">
                      ₹ {property.price}

                      {isRent && (
                        <span className="text-sm
                                         text-gray-500
                                         font-normal">
                          {" "}
                          / month
                        </span>
                      )}
                    </p>


                    {/*  ACTION BUTTONS */}

                    <div className="grid grid-cols-3
                                    gap-2 mt-5">


                      {/* VIEW */}

                      <Link
                        to={
                          isRent
                            ? `/rent-property/${propertyId}`
                            : `/buy-property/${propertyId}`
                        }
                        className="flex items-center
                                   justify-center gap-1
                                   border border-gray-300
                                   rounded-lg py-2
                                   text-sm font-medium
                                   text-gray-700
                                   hover:bg-gray-100
                                   transition"
                      >
                        <Eye size={17} />
                        View
                      </Link>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDelete(propertyId)
                        }
                        className="flex items-center
                                   justify-center gap-1
                                   border border-red-300
                                   rounded-lg py-2
                                   text-sm font-medium
                                   text-red-600
                                   hover:bg-red-50
                                   transition"
                      >
                        <Trash2 size={17} />
                        Delete
                      </button>

                    </div>

                  </div>

                </motion.div>
              );
            })

          ) : (

            /* EMPTY STATE */

            <div className="col-span-full
                            text-center py-16">

              <div className="bg-white
                              rounded-2xl
                              shadow-md
                              p-10
                              max-w-lg
                              mx-auto">

                <h3 className="text-2xl
                               font-bold
                               text-gray-800">

                  {filter === "All"
                    ? "No Properties Yet"
                    : filter === "Buy"
                    ? "No Properties for Sale"
                    : "No Rental Properties"}

                </h3>


                <p className="text-gray-500 mt-2">

                  {filter === "All"
                    ? "You haven't posted any properties yet."
                    : filter === "Buy"
                    ? "You don't have any properties listed for sale."
                    : "You don't have any properties listed for rent."}

                </p>


                <Link
                  to="/post-property"
                  className="inline-flex
                             items-center gap-2
                             mt-6
                             bg-sky-800
                             text-white
                             px-6 py-3
                             rounded-lg
                             font-semibold
                             hover:bg-sky-700
                             transition"
                >
                  <Plus size={20} />
                  Post Property
                </Link>

              </div>

            </div>

          )}

        </div>
      )}

    </div>
  );
}

export default MyProperties;