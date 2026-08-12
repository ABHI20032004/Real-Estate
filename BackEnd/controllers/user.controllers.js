import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

/// UPDATE USER 
export const updateUser = async (req, res) => {
  try {
    const {
      username,
      email,
      photo,
      bio,
      password,
    } = req.body;

    const updateData = {};

    if (username !== undefined && username.trim() !== "") {
      updateData.username = username.trim();
    }

    if (email !== undefined && email.trim() !== "") {
      updateData.email = email.trim();
    }

    if (photo !== undefined) {
      updateData.photo = photo;
    }

    if (bio !== undefined) {
      updateData.bio = bio;
    }

    // Hash password if user entered a new password
    if (password && password.trim() !== "") {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    // Duplicate username/email
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    console.log("DELETE USER ID:", req.params.id);

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};