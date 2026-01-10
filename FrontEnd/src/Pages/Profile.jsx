import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-emerald-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] p-10 text-white border border-white/10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Update your personal details and secure your account
          </p>
        </div>


        {/* FORM */}
        <form className="space-y-6">
          {/* Profile Picture */}
        <input 
          type="file"
          hidden
          accept="image/*"
        />
        <img
          src={currentUser.photo || "/image.png"}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              defaultValue={currentUser?.username}
              className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={currentUser?.email}
              className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              rows="4"
              placeholder="Tell us a little about yourself..."
              className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6"></div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 py-3.5 rounded-xl font-semibold transition shadow-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:opacity-90 py-3.5 rounded-xl font-semibold transition shadow-lg"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
