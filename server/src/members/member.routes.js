import express from "express";
import {
  login,
  refreshAccessToken,
  logout,
  verifyMember,
  getAllMembers,
  createMember,
} from "./member.controller.js";
import { authenticateMember } from "./member.middleware.js";
import { authenticateAdmin } from "../Admin/admin.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.get("/verify", authenticateMember, verifyMember);

router.get("/", authenticateAdmin, getAllMembers);
router.post("/", authenticateAdmin, createMember);

export default router;
