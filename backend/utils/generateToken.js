import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: '15d',
  });

  const options = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevent xss attack cross-site scripting attack , may it not be accessed by js
    sameSite: "strict", // csrf attack , it can only be accessed by the same site
    secure: ENV_VARS.NODE_ENV === "development" ? false : true, // cookie will only be sent in production mode
  };

  res.cookie("jwt-netflix-token", token, options);

  return token; // return token to be used in the controller
};
