const express = require('express');
const router = express.Router();
const Athlete = require('../models/Athlete');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const athlete = await Athlete.findById(decoded.id);
    
    if (!athlete) {
      return res.status(401).json({ message: 'Athlete not found' });
    }

    req.athlete = athlete;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Get athlete profile
router.get('/profile', auth, async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.athlete._id).select('-password');
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update athlete profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const athlete = await Athlete.findByIdAndUpdate(
      req.athlete._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(athlete);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 