import Event from "../models/event.model.js";
import User from "../models/user.model.js";

//Student Functions
export async function getUpcomingEvents(req, res) {
    try {
        const now = new Date();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const total = await Event.countDocuments({ date: { $gte: now } });
        const events = await Event.find({
            date: { $gte: now },
        }).sort("date").skip(skip).limit(limit);
        res.status(200).json({ success: true, events, totalPages: Math.ceil(total / limit), currentPage: page });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getPastEvents(req, res) {
    try {
        const now = new Date();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const total = await Event.countDocuments({ date: { $lt: now } });
        const events = await Event.find({ date: { $lt: now } }).sort("-date").skip(skip).limit(limit);
        res.status(200).json({ success: true, events, totalPages: Math.ceil(total / limit), currentPage: page });
    } catch (error) {
        console.error(" Error in getPastEvents:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchEventsByName(req, res) {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }
        const event = await Event.find({ name: { $regex: name.trim(), $options: "i" } });
        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}

export async function registerForEvent(req, res) {
    try {
        const { eventId } = req.params;
        const userId = req.user._id; // Assuming user ID is stored in req.user by protectRoute middleware
        const { name, email, registrationNumber, department, year } = req.body;
        if (!name || !email || !registrationNumber || !department || !year) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        const now = new Date();
        if (now > event.deadline) {
            return res.status(400).json({ success: false, message: "Application closed" });
        }
        if (now >= event.date) {
            return res.status(400).json({ success: false, message: "Event has already started" });
        }
        const alreadyRegistered = event.participants.some((p) => p.user.toString() === userId.toString());
        if (alreadyRegistered) {
            return res.status(400).json({ success: false, message: "Already registered" });
        }

        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ success: false, message: "Event is full" });
        }
        event.participants.push({
            user: userId,
            name,
            email,
            registrationNumber,
            department,
            year
        });
        await event.save();
        res.status(200).json({ success: true, message: "Registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


//Admin Functions

export async function createEvent(req, res) {
    try {
        const { name, description, date, deadline, coordinators, location, maxParticipants } = req.body;
        if (!name || !description || !date || !coordinators || !location || !maxParticipants) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const eventDate = new Date(date);
        const now = new Date();
        if (eventDate - now < 24 * 60 * 60 * 1000) {
            return res.status(400).json({ success: false, message: "Event date must be at least 24 hours from now" });
        }
        const deadlineDate = deadline ? new Date(deadline) : new Date(eventDate.getTime() - 60 * 60 * 1000);
        if (deadlineDate >= eventDate) {
            return res.status(400).json({ success: false, message: "Deadline must be before event start time" });
        }
        const newEvent = new Event({
            name, description, date: eventDate, deadline: deadlineDate, coordinator: coordinators, location, maxParticipants
        });
        await newEvent.save();
        res.status(201).json({ success: true, message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export async function getEventParticipants(req, res) {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, participants: event.participants });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function updateEvent(req, res) {
    try {
        const { eventId } = req.params;
        const updates = req.body;
        if (updates.date) {
            const newDate = new Date(updates.date);
            if (newDate - new Date() < 24 * 60 * 60 * 1000) {
                return res.status(400).json({ success: false, message: "Event date must be at least 24 hours from now" });
            }
            updates.date = newDate;
            if (!updates.deadline) {
                updates.deadline = new Date(newDate.getTime() - 60 * 60 * 1000);
            }
            else {
                const dl = new Date(updates.deadline);
                if (dl >= newDate) {
                    return res.status(400).json({ success: false, message: "Deadline must be before event start time" });
                }
                updates.deadline = dl;
            }
        }
        const updated = await Event.findByIdAndUpdate(eventId, updates, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event updated successfully", event: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteEvent(req, res) {
    try {
        const { eventId } = req.params;
        const deleted = await Event.findByIdAndDelete(eventId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
