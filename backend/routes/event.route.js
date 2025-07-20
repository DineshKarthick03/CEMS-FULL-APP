import express from 'express';
import { getUpcomingEvents,getPastEvents,searchEventsByName,registerForEvent,createEvent,getEventParticipants,updateEvent,deleteEvent } from '../controllers/event.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { isAdmin } from '../middleware/isAdmin.js';


const router = express.Router();
// Student Routes
router.get("/upcoming",protectRoute,getUpcomingEvents);
router.get("/past",protectRoute,getPastEvents);
router.get("/search",protectRoute,searchEventsByName);
router.post("/:eventId/register",protectRoute,registerForEvent);

// Admin Routes
router.post("/",protectRoute,isAdmin,createEvent);
router.get("/:eventId/participants",protectRoute,isAdmin,getEventParticipants);
router.put("/:eventId",protectRoute,isAdmin,updateEvent);
router.delete("/:eventId",protectRoute,isAdmin,deleteEvent);

export default router;