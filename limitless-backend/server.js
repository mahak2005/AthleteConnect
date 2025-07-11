const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const athleteRoutes = require('./routes/athlete');
const path = require('path');
const postsRoutes = require('./routes/posts');
const eventsRoutes = require('./routes/events');

dotenv.config();

const app = express();

// Increase body parser limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://athlete-connect.vercel.app',
    'https://athleteconnect.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection with retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/limitless-athlete')
    .then(() => {
      console.log('Connected to MongoDB');
      const db = mongoose.connection;
      console.log('MongoDB Connection Status:');
      console.log('- Host:', db.host);
      console.log('- Port:', db.port);
      console.log('- Database:', db.name);
      console.log('- Ready State:', db.readyState);
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5001);
    });
};

connectWithRetry();

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/athlete', athleteRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/events', eventsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/api/test`);
}); 