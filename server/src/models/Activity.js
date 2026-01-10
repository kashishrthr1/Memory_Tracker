// models/Activity.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  topicName: { type: String, required: true },
  activityType: { 
    type: String, 
    enum: ['added', 'revised'], 
    required: true 
  },
  scoreChange: { type: String }, // e.g., "+12%"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);