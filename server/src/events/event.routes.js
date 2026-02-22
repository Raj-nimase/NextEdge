import express from "express";
import upload from "./upload.js";
import {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getEventById,
  deleteEvent,
  updateEvent,
  addEventMedia,
  deleteEventMedia,
  getAllEventImages,
} from "./event.controller.js";
import {
  registerForEvent,
  getRegistrationStatus,
  getEventRegistrations,
  optionalMemberAuth,
} from "./registration.controller.js";
import { authenticateAdmin } from "../Admin/admin.middleware.js";

const router = express.Router();

// Protected routes - Admin only
router.post(
  "/",
  authenticateAdmin,
  upload.fields([{ name: "coverImage", maxCount: 1 }]),
  createEvent,
);

// update event details
router.put("/:id", authenticateAdmin, updateEvent);

// add images
router.patch(
  "/:id/media",
  authenticateAdmin,
  upload.fields([{ name: "images", maxCount: 10 }]),
  addEventMedia,
);
// delete single media
router.delete("/:id/media/:publicId", authenticateAdmin, deleteEventMedia);

// delete event
router.delete("/:id", authenticateAdmin, deleteEvent);

// Public routes
router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/past", getPastEvents);
router.get("/gallery", getAllEventImages);

// Registration (must be before /:id so :eventId is not consumed by :id)
router.post("/:eventId/register", optionalMemberAuth, registerForEvent);
router.get("/:eventId/register/status", optionalMemberAuth, getRegistrationStatus);
router.get("/:eventId/registrations", authenticateAdmin, getEventRegistrations);

router.get("/:id", getEventById);

export default router;
