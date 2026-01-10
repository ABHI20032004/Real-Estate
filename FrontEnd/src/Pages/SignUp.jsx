import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import OAuth from "../Components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await fetch("/BackEnd/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/signin");

    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 sm:px-6 bg-gray-50 pt-24 pb-10">
      <div
        className="
          w-full max-w-md 
          bg-white 
          rounded-2xl 
          border border-blue-600 
          shadow-xl 
          p-6 sm:p-8
        "
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-2">
          Create Account
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
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full 
              bg-blue-600 
              text-white 
              py-2.5 sm:py-3 
              rounded-lg 
              font-semibold
              hover:bg-blue-700 
              transition-all 
              duration-300 
              shadow-md 
              hover:shadow-lg
              disabled:opacity-70
            "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <OAuth/>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
          
        </p>
      </div>
    </div>
  );
}

export default SignUp;
