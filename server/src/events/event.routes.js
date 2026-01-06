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
import { authenticateAdmin } from "../Admin/admin.middleware.js";

const router = express.Router();

// Protected routes - Admin only
router.post(
  "/",
  authenticateAdmin,
  upload.fields([{ name: "images", maxCount: 10 }]),
  createEvent
);

// update event details
router.put("/:id", authenticateAdmin, updateEvent);

// add images
router.patch(
  "/:id/media",
  authenticateAdmin,
  upload.fields([{ name: "images", maxCount: 10 }]),
  addEventMedia
);
// delete single media
router.delete("/:id/media/:publicId", authenticateAdmin, deleteEventMedia);

// delete event
router.delete("/:id", authenticateAdmin, deleteEvent);

// Public routes - No authentication required
router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/past", getPastEvents);
router.get("/gallery", getAllEventImages);
router.get("/:id", getEventById);

export default router;
