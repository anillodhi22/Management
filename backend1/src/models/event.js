import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    venue: { type: String },
    organizer: { type: String, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    remindersSent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);
