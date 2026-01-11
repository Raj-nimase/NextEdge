import express from "express";
import {
  createMembership,
  createVolunteer,
  getAllMemberships,
  getAllVolunteers,
  deleteMembership,
  deleteVolunteer,
} from "./contact.controller.js";
import { authenticateAdmin } from "../Admin/admin.middleware.js";

const router = express.Router();

// Public routes - Form submissions
router.post("/membership", createMembership);
router.post("/volunteer", createVolunteer);

// Protected routes - Admin only
router.get("/membership", authenticateAdmin, getAllMemberships);
router.get("/volunteer", authenticateAdmin, getAllVolunteers);
router.delete("/membership/:id", authenticateAdmin, deleteMembership);
router.delete("/volunteer/:id", authenticateAdmin, deleteVolunteer);

export default router;
