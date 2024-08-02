import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

//  ******************************************Signup Controller******************************************
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const Profile_Pics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = Profile_Pics[Math.floor(Math.random() * Profile_Pics.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        user: { ...newUser._doc, password: "" },
        message: "User created successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "User could not be created",
      });
    }
  } catch (error) {
    console.error("Error in signup Controller❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//  ******************************************Login Controller******************************************
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      user: { ...user._doc, password: "" },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error in login Controller❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//  ******************************************Logout Controller******************************************
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix-token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout Controller❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//  ******************************************Auth Check Controller******************************************
export async function authCheak(req, res) {
  try {
    res.status(200).json({ success: true, user : req.user });
  } catch (error) {
    console.error("Error in authCheak Controller❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}