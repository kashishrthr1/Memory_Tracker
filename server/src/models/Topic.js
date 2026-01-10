const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  scoreBeforeRevision: Number,
  scoreAfterRevision: Number,
  daysSinceLastRevision: Number
});

const TopicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicName: { type: String, required: true },

  baseMemoryScore: { type: Number, required: true, min: 0, max: 100 },
  stability: { type: Number, required: true },      // days
  difficulty: { type: Number, required: true, min: 0, max: 1 },
  revisionCount: { type: Number, default: 0 },

  lastRevisedAt: { type: Date, default: Date.now },
  revisionHistory: [revisionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Topic', TopicSchema);
