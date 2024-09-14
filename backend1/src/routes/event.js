import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import {
  createEvent,
  deleteEvent,
  getAttendees,
  getEventById,
  getEvents,
  rsvpEvent,
} from "../controllers/event.js";

const router = Router();

router.route("/create-event").post( createEvent);
router.route("/").get( getEvents);
router.route("/:id").get( getEventById);
router.route("/:id").delete( deleteEvent);
router.route("/:id/rsvp'").post(verifyJWT, rsvpEvent);
router.route("/:id/attendees").get(verifyJWT, getAttendees);

export default router;
