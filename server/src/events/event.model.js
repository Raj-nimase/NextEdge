import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // Legacy: kept for backward compatibility; prefer eventStartDate
    date: { type: Date },
    eventStartDate: { type: Date },
    registrationStartDate: { type: Date },
    registrationEndDate: { type: Date },
    accessType: {
      type: String,
      required: true,
      enum: ["public", "members"],
      default: "public",
    },
    location: { type: String },

    coverImage: mediaSchema,
    images: [mediaSchema],
    youtubeVideoUrl: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
