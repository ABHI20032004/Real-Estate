import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res ,next) => 
 {
    const { username, email, password } = req.body;

    // 1️⃣ Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // 2️⃣ Check duplicate user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = password

    // 4️⃣ Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    try {   
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    } catch (error) {
        message: "Error in registering user"
        next(error)
      };
    }

export const signin = async (req, res ,next) => {
     
  const { email, password } = req.body;
  // 1️⃣ Validation
  try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      } 
      // 2️⃣ Check user existence
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email ",
        });
      }
      // 3️⃣ Verify password
      const isPasswordValid =(password === user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
      const jwtwebtoken = jwt.sign({id:user._id},process.env.JWT_SECRET);

      const { password: pwd, ...others} = user._doc;

      res.cookie("token",jwtwebtoken,{
        httpOnly:true
      }).status(200).json({
        success:true,
        message:"Signin Successful",
        user:others
      });
    }
     catch (error) {
        message: "Error in signing in"
        next(error)
    }

    }

export const googleAuth = async (req, res, next) => {
  try {
    const { email, username, photo } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    let user = await User.findOne({ email });

    // 🔹 USER EXISTS → SIGN IN
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );

      const { password, ...others } = user._doc;

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json({
          success: true,
          message: "Signin successful",
          user: others,
        });
    }

    // 🔹 NEW USER → SIGN UP
    const generatedPassword = 12345678;

    const newUser = new User({
      username: username || email.split("@")[0], // ✅ fallback
      email,
      photo,
      password: generatedPassword,
    });

    user = await newUser.save();

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET
    );

    const { password, ...others } = user._doc;

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Account created with Google",
        user: others,
      });

  } catch (error) {
    console.error("Google Auth Error:", error);
    next(error);
  }
};
