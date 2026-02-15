import Event from "./event.model.js";
import { uploadBuffer } from "./uploadToImageKit.js";
import imagekit from "../config/imagekit.js";
import { isValidYoutubeUrl } from "../utils/youtube.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const images = [];

    if (req.files?.images) {
      console.log(
        "Processing",
        req.files.images.length,
        "images for new event"
      );
      for (const file of req.files.images) {
        const fileName = `event_image_${Date.now()}_${Math.floor(
          Math.random() * 1000
        )}`;
        console.log("Uploading image:", fileName);
        const result = await uploadBuffer(
          file.buffer,
          "events/images",
          fileName
        );
        console.log("Upload result:", result);
        images.push({
          url: result.url,
          publicId: result.fileId,
        });
      }
    }

    // Validate YouTube URL if provided
    if (
      req.body.youtubeVideoUrl &&
      !isValidYoutubeUrl(req.body.youtubeVideoUrl)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid YouTube URL" });
    }

    const event = await Event.create({
      ...req.body,
      images,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json({ success: true, events });
};

// GET UPCOMING EVENTS
export const getUpcomingEvents = async (req, res) => {
  const events = await Event.find({
    date: { $gte: new Date() },
  }).sort({ date: 1 });

  res.json({ success: true, events });
};

// GET PAST EVENTS
export const getPastEvents = async (req, res) => {
  const events = await Event.find({
    date: { $lt: new Date() },
  }).sort({ date: -1 });

  res.json({ success: true, events });
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  res.json({ success: true, event });
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  for (const img of event.images) {
    try {
      await imagekit.deleteFile(img.publicId);
    } catch (deleteError) {
      console.error(
        "Error deleting image from ImageKit during event deletion:",
        deleteError
      );
      // Continue with other deletions even if one fails
    }
  }

  await event.deleteOne();
  res.json({ success: true, message: "Event deleted" });
};

// UPDATE EVENT DETAILS
export const updateEvent = async (req, res) => {
  try {
    // Validate YouTube URL if provided
    let youtubeVideoUrl = req.body.youtubeVideoUrl;
    if (youtubeVideoUrl && !isValidYoutubeUrl(youtubeVideoUrl)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid YouTube URL" });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        youtubeVideoUrl: youtubeVideoUrl,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD MEDIA TO EVENT
export const addEventMedia = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    console.log("Adding media to event:", req.params.id);
    console.log("Files received:", req.files ? Object.keys(req.files) : "none");

    if (req.files?.images) {
      console.log("Processing", req.files.images.length, "images");
      for (const file of req.files.images) {
        const fileName = `event_image_${Date.now()}_${Math.floor(
          Math.random() * 1000
        )}`;
        console.log("Uploading image:", fileName);
        const result = await uploadBuffer(
          file.buffer,
          "events/images",
          fileName
        );
        console.log("Upload result:", result);
        event.images.push({
          url: result.url,
          publicId: result.fileId,
        });
      }
    }

    await event.save();
    res.json({ success: true, event });
  } catch (error) {
    console.error("Error in addEventMedia:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE SINGLE MEDIA
export const deleteEventMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const publicId = decodeURIComponent(req.params.publicId);

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if image
    const imageIndex = event.images.findIndex(
      (img) => img.publicId === publicId
    );

    if (imageIndex !== -1) {
      // delete image from imagekit
      try {
        await imagekit.deleteFile(publicId);
      } catch (deleteError) {
        console.error("Error deleting image from ImageKit:", deleteError);
        // Continue with database removal even if ImageKit deletion fails
      }

      // remove from db
      event.images.splice(imageIndex, 1);
    } else {
      return res.status(404).json({ message: "Media not found" });
    }

    await event.save();

    res.json({ success: true, message: "Media deleted" });
  } catch (error) {
    console.error("DELETE MEDIA ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete media",
      error: error.message,
    });
  }
};

// GET ALL EVENT IMAGES FOR GALLERY
export const getAllEventImages = async (req, res) => {
  try {
    const events = await Event.find()
      .select("title description date location images")
      .sort({ date: -1 }); // Most recent first

    // Flatten all images with event context
    const gallery = [];

    events.forEach((event) => {
      if (event.images && event.images.length > 0) {
        event.images.forEach((image) => {
          gallery.push({
            url: image.url,
            publicId: image.publicId,
            eventTitle: event.title,
            eventDate: event.date,
            eventLocation: event.location || "Location TBA",
            eventDescription: event.description || "",
          });
        });
      }
    });

    res.json({
      success: true,
      count: gallery.length,
      images: gallery,
    });
  } catch (error) {
    console.error("GET GALLERY IMAGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
      error: error.message,
    });
  }
};
