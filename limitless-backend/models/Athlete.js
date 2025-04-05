const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const athleteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['athlete', 'coach'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "/ath.jpg"
  },
  country: {
    type: String,
    required: true
  },
  basicInfo: {
    fullName: { type: String, default: "" },
    age: { type: Number, default: 0 },
    gender: { type: String, default: "" },
    nationality: { type: String, default: "" },
    state: { type: String, default: "" },
    sport: { type: String, default: "" },
    category: { type: String, default: "" },
    currentRanking: { type: String, default: "" }
  },
  about: { type: String, default: "" },
  achievements: {
    medals: { type: [String], default: [] },
    records: { type: [String], default: [] },
    awards: { type: [String], default: [] }
  },
  sponsorship: {
    needs: { type: [String], default: [] },
    impact: { type: String, default: "" }
  },
  social: {
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" }
  },
  contact: {
    email: { type: String, default: "" },
    phone: { type: String, default: "" }
  }
}, { timestamps: true });

// Hash password before saving
athleteSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
athleteSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Athlete', athleteSchema); 