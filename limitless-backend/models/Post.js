const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Comment content is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
postSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema); 