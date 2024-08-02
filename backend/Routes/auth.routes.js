import express from "express";
import dotenv from "dotenv";
import { authCheak, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

dotenv.config();
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheak", protectRoute , authCheak);

export default router;
