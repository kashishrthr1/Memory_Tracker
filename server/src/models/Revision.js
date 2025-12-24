const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },

    type: { type: String, enum: ["FIRST_TIME", "REVISION"], required: true },

    memoryScoreBefore: Number,
    memoryScoreAfter: Number,

    assessment: {
      q1: Number,
      q2: Number,
      q3: Number,
      q4: Number,
      q5: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Revision", revisionSchema);
