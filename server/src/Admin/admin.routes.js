import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  verifyAdmin,
  getProfile,
} from "./admin.controller.js";
import { authenticateAdmin } from "./admin.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

// Protected routes (require authentication)
router.post("/logout", authenticateAdmin, logout);
router.get("/verify", authenticateAdmin, verifyAdmin);
router.get("/profile", authenticateAdmin, getProfile);

export default router;
