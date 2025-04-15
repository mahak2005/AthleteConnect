const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create a new event
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      time,
      location,
      isOnline,
      maxAttendees
    } = req.body;

    // Validate required fields
    if (!name || !description || !date || !time || !location || !maxAttendees) {
      return res.status(400).json({
        message: 'All fields are required',
        missing: {
          name: !name,
          description: !description,
          date: !date,
          time: !time,
          location: !location,
          maxAttendees: !maxAttendees
        }
      });
    }

    const event = new Event({
      name,
      description,
      date,
      time,
      location,
      isOnline: isOnline || false,
      maxAttendees,
      organizer: req.user.id
    });

    await event.save();

    // Populate organizer details
    await event.populate('organizer', 'name image');

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      message: 'Server error while creating event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('organizer', 'name image')
      .populate('attendees', 'name image');

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      message: 'Server error while fetching events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Register for an event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is full
    if (event.currentAttendees >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if user is already registered
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Add user to attendees and increment count
    event.attendees.push(req.user.id);
    event.currentAttendees += 1;

    await event.save();

    // Populate attendee details
    await event.populate('attendees', 'name image');

    res.json(event);
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({
      message: 'Server error while registering for event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 