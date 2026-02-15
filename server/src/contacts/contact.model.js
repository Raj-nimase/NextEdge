import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: { type: String, trim: true },
    year: {
      type: String,
      required: true,
      enum: ["First Year", "Second Year", "Third Year", "Fourth Year", "Graduate"],
    },
    interests: [{ type: String }],
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: { type: String, trim: true },
    year: {
      type: String,
      required: true,
      enum: ["First Year", "Second Year", "Third Year", "Fourth Year", "Graduate"],
    },
    interestArea: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Membership = mongoose.model("Membership", membershipSchema);
export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
