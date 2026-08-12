import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Mail, FileText, Camera, Save, ArrowLeft,Trash2 } from "lucide-react";

// Change this import according to your actual userSlice exports
import {signOut, updateUser } from "../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState(
    currentUser?.username || ""
  );

  const [email, setEmail] = useState(
    currentUser?.email || ""
  );

  const [bio, setBio] = useState(
    currentUser?.bio || ""
  );

  const [photo, setPhoto] = useState(
    currentUser?.photo || "image.png"
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?._id) {
      alert("User not found");
      return;
    }

      if (password && password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/BackEnd/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            bio,
            photo,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update account"
        );
      }

      // Update Redux
      dispatch(updateUser(data.user));

      alert("Account updated successfully!");

    } catch (error) {
      console.error("Update account error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Please login to manage your account.
        </p>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/BackEnd/user/delete/${currentUser._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete account"
      );
    }

    dispatch(signOut());

    alert("Account deleted successfully");

    navigate("/");

  } catch (error) {
    console.error("Delete account error:", error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-br from-sky-100 via-white to-blue-100">

      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-sky-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-sky-800 text-white px-8 py-8">

            <h1 className="text-3xl font-bold">
              Manage your Account
            </h1>

            <p className="text-sky-100 mt-2">
              Update your profile information
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-7"
          >

            {/* Profile Photo */}
            <div className="flex flex-col items-center">

              <div className="relative">

                <img
                  src={
                    photo?.startsWith("data:")
                      ? photo
                      : `/${photo || "image.png"}`
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-sky-100 shadow-lg"
                />

                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full
                            bg-sky-700 text-white flex items-center justify-center
                            cursor-pointer hover:bg-sky-800 transition"
                >
                  <Camera size={18} />

                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file) return;

                      // 5MB limit
                      if (file.size > 5 * 1024 * 1024) {
                        alert("Image must be less than 5MB");
                        return;
                      }

                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setPhoto(reader.result);
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
                </label>

              </div>

              <p className="text-sm text-gray-500 mt-3">
                Profile Photo
              </p>

            </div>


            {/* Username */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                Username
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />

              </div>

            </div>


            {/* Bio */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                Bio
              </label>

              <div className="relative">

                <FileText
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  rows="4"
                  placeholder="Tell something about yourself..."
                  className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none resize-none focus:ring-2 focus:ring-sky-500"
                />

              </div>

            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>


            {/* Save */}
            <div className="flex gap-4 mt-15">

                  {/* Save Changes */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2
                              bg-sky-800 text-white py-3 rounded-lg
                              font-semibold hover:bg-sky-700
                              transition disabled:opacity-50"
                  >
                    <Save size={20} />

                    {loading ? "Saving..." : "Save Changes"}
                  </button>


                  {/* Delete Account */}
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="flex-1 flex items-center justify-center gap-2
                              bg-red-600 text-white py-3 rounded-lg
                              font-semibold hover:bg-red-700
                              transition"
                  >
                    <Trash2 size={20} />
                    Delete Account
                  </button>

                </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;