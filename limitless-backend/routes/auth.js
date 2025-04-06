const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Athlete = require('../models/Athlete');

// Register new athlete
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, country, role } = req.body;
    
    // Validate required fields
    if (!email || !password || !name || !country || !role) {
      return res.status(400).json({ 
        message: 'All fields are required',
        missing: {
          email: !email,
          password: !password,
          name: !name,
          country: !country,
          role: !role
        }
      });
    }

    // Validate role
    if (!['athlete', 'coach'].includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be either athlete or coach' 
      });
    }
    
    // Check if athlete already exists
    const existingAthlete = await Athlete.findOne({ email });
    if (existingAthlete) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new athlete
    const athlete = new Athlete({
      email,
      password,
      name,
      country,
      role
    });

    await athlete.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: athlete._id,
        email: athlete.email,
        role: athlete.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      athlete: {
        id: athlete._id,
        name: athlete.name,
        email: athlete.email,
        role: athlete.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login athlete
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        missing: {
          email: !email,
          password: !password
        }
      });
    }

    // Find athlete
    const athlete = await Athlete.findOne({ email });
    if (!athlete) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await athlete.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: athlete._id,
        email: athlete.email,
        role: athlete.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      athlete: {
        id: athlete._id,
        name: athlete.name,
        email: athlete.email,
        role: athlete.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 