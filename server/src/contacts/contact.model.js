import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    year: { type: String, required: true },
    interests: [{ type: String }], // Array of club interests
    message: { type: String },
  },
  { timestamps: true }
);

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    year: { type: String, required: true },
    interestArea: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export const Membership = mongoose.model("Membership", membershipSchema);
export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
