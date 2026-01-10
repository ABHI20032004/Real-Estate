import User from "../models/user.models.js";

/* ================= TEST ================= */
export const test = (req, res) => {
  res.send("Test route being called!!!");
};

/* ================= UPDATE USER ================= */
// export const updateUser = async (req, res, next) => {
//   try {
//     const updateData = {};

//     if (req.body.username) updateData.username = req.body.username;
//     if (req.body.email) updateData.email = req.body.email;
//     if (req.body.photo) updateData.photo = req.body.photo;
//     if (req.body.bio) updateData.bio = req.body.bio;

//     // ❗ Password updated ONLY if provided
//     if (req.body.password && req.body.password.trim() !== "") {
//       updateData.password = req.body.password;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// /* ================= DELETE USER ================= */
// export const deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.clearCookie("access_token");
//     res.status(200).json({ message: "User has been deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

/* ================= GET USER PROFILE ================= */
// export const getUserProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// }

