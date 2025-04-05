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

// Get all athletes
router.get('/all', async (req, res) => {
  try {
    const athletes = await Athlete.find({ role: 'athlete' }).select('-password');
    res.json(athletes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get athlete by ID
router.get('/:id', async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id).select('-password');
    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update athlete profile picture
router.put('/profile/image', auth, async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ 
        success: false,
        message: 'No image data provided' 
      });
    }

    // Validate that it's a base64 string
    if (!image.startsWith('data:image/')) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid image format. Please provide a valid image file.' 
      });
    }

    const athlete = await Athlete.findByIdAndUpdate(
      req.athlete._id,
      { $set: { image } },
      { new: true }
    ).select('-password');

    if (!athlete) {
      return res.status(404).json({ 
        success: false,
        message: 'Athlete not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Image uploaded successfully',
      image: athlete.image 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while uploading image',
      error: error.message 
    });
  }
});

module.exports = router; 