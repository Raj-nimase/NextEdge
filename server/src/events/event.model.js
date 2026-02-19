import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },

    coverImage: mediaSchema, // Single cover image (set at creation)
    images: [mediaSchema], // Gallery images (added after event passes)
    youtubeVideoUrl: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
