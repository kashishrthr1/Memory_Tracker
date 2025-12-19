const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic"
    },
    confidence: Number,
    recallSpeed: Number,
    clarity: Number,
    calculatedScore: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
