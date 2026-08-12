import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res ,next) => 
 {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    //  Check duplicate user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //  Save user
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
  // Validation
  try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      } 
      //  Check user existence
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email ",
        });
      }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const jwtwebtoken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

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
