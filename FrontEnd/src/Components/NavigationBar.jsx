import React, { useState } from "react";
import { Menu, X ,UserPlus, LogIn  } from "lucide-react";
import { Link } from "react-router-dom";
import "../index.css"; 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { LogOut, User } from "lucide-react";
import { useEffect ,useRef} from "react";


function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
   const [profileOpen, setProfileOpen] = useState(false);

  const {currentUser} = useSelector((state) => state.user); 
  console.log(currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

   useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(signOut());
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-150">
      <div className="flex justify-between items-center px-6 md:px-10 py-3">
        {/* 🏠 Logo */}
        <Link
          to="/"
          className="text-4xl font-serif font-bold text-sky-800 hover:text-sky-700 transition-colors duration-300"
        >
          The Dreams
        </Link>

        {/* 🍔 Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-blue-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* 🧭 Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>

          <Link to="/buy" className="nav-link">
            Buy
          </Link>

          <Link to="/rent" className="nav-link">
            Rent
          </Link>

          <Link to="/sell" className="nav-link">
            Sell
          </Link>

          {/* 🏡 Post Property Button */}
          <Link
            to={currentUser ? "/sell" : "/signup"}
            className="relative bg-sky-800 text-white px-5 py-2 rounded-lg font-semibold shadow-sm
                      transition-all duration-300 ease-in-out hover:bg-sky-700 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Post Property
          </Link>

              

          {/* 👤 User Icon + Login */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <img
                src={"/image.png"}
                alt="profile"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full cursor-pointer border border-sky-700 hover:scale-110 transition"
              />

              {/* Dropdown */}
              {profileOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden">

                    {/* Top Profile Section */}
                    <div className="flex flex-col items-center px-6 py-5 border-b">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
                        {currentUser.username?.charAt(0).toUpperCase()}
                      </div>

                      {/* Name */}
                      <h3 className="mt-3 font-bold text-gray-900 tracking-wide uppercase">
                        {currentUser.username}
                      </h3>

                      {/* Email */}
                      <p className="text-sm text-gray-500">
                        {currentUser.email}
                      </p>

                      {/* Manage Account Button */}
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setProfileOpen(false);
                        }}
                        className="mt-4 w-full border border-gray-300 rounded-md py-2 text-sm font-medium
                                  hover:bg-gray-100 transition"
                      >
                        Manage your Account
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="py-3 px-6 space-y-3 text-sm text-gray-700">
                      <button className="w-full text-left hover:text-black transition">
                        Organizations
                      </button>
                      <button className="w-full text-left hover:text-black transition">
                        All Clusters
                      </button>
                      <button className="w-full text-left hover:text-black transition">
                        Invitations
                      </button>
                      <button className="w-full text-left hover:text-black transition flex items-center gap-1">
                        Send Feedback
                        <span className="text-sky-700 text-xs">↗</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t-2  text-gray-200 shadow-5xl px-6 py-3">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm font-medium text-red-600 hover:scale-105 transition"
                      >
                        LogOut
                      </button>
                    </div>
                  </div>
                )}

            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/signup" className="flex items-center gap-2 hover:text-sky-700">
                <UserPlus size={20} /> Register
              </Link>
              <Link to="/signin" className="flex items-center gap-2 hover:text-sky-700">
                <LogIn size={20} /> Login
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fadeIn z-140">
          <div className="flex flex-col gap-6 px-6 py-6">

            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-sky-700 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/buy"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-sky-700 transition"
            >
              Buy
            </Link>

            <Link
              to="/rent"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-sky-700 transition"
            >
              Rent
            </Link>

            <Link
              to="/sell"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-sky-700 transition"
            >
              Sell
            </Link>

            {/* Post Property Button */}
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-sky-800 text-white text-center py-2 rounded-lg font-semibold
                        hover:bg-sky-700 transition-all duration-300"
            >
              Post Property
            </Link>

            {/* Divider */}
            <div className="border-t pt-4 flex flex-col gap-4">

              {/* Register */}
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full
                                bg-green-100 group-hover:bg-green-600 transition">
                  <UserPlus
                    size={22}
                    className="text-green-600 group-hover:text-white transition"
                  />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-green-600 transition">
                  Register
                </span>
              </Link>

              {/* Login */}
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full
                                bg-blue-100 group-hover:bg-sky-700 transition">
                  <LogIn
                    size={22}
                    className="text-sky-700 group-hover:text-white transition"
                  />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-sky-700 transition">
                  Login
                </span>
              </Link>

            </div>
          </div>
        </div>
      )}

    </nav>
  );
}

export default NavigationBar;
