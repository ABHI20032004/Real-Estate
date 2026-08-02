import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInstart,
  signInsuccess,
  signInfailure,
  clearError,
} from "../redux/user/userSlice.js";
// import OAuth from "../Components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // ✅ Clear stale Redux error on page load
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInstart());

      const res = await fetch("/BackEnd/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInfailure(data.message || "Signin failed"));
        return;
      }

      dispatch(signInsuccess(data.user));
      navigate("/");
    } catch (err) {
      dispatch(signInfailure("An error occurred. Please try again."));
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 sm:px-6 bg-gray-50 pt-24 pb-10">
      <div className="w-full max-w-md bg-white rounded-2xl border border-blue-600 shadow-xl p-6 sm:p-8">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-2">
          Sign In
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Join <span className="font-semibold">The Dreams</span>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold
              hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg
              disabled:opacity-70
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Google OAuth */}
          {/* <OAuth /> */}
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
