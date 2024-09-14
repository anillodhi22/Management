import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.js";
import mongoose from "mongoose";

const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    organizer,
    venue,
    attendees,
    remindersSent,
  } = req.body;

  const data = await Event.create({
    title,
    description,
    date,
    organizer,
    venue,
    attendees,
    remindersSent,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Event created successfully"));
});

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  if (!events) {
    throw new ApiError(404, "There is no events");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const getEventById = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  if (!mongoose.isValidObjectId(eventId)) {
    throw new ApiError(400, "Invalid evenntId");
  }

  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  if (!mongoose.isValidObjectId(eventId)) {
    throw new ApiError(400, "Invalid evenntId");
  }

  const event = await Event.findByIdAndDelete(eventId);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event deleted successfully"));
});

const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, "event not found");
  }

  if (!event.attendees.includes(req.body.userId)) {
    event.attendees.push(req.body.userId);
    await event.save();
  }

  return res.status(200).json(new ApiResponse(200, event, "RSVP successful"));
});

const getAttendees = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("attendees");

  if (!event) {
    throw new ApiError(404, "event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "RSVP fetched successful"));
});

export {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
  rsvpEvent,
  getAttendees,
};
