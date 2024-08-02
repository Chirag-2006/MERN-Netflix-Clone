import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies["jwt-netflix-token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token Provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Token expired",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Invalid token",
        });
      }
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // why? => to be able to access the user in the protected route
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware❌ : ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
