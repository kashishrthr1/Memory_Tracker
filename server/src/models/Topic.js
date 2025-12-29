const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },

    memoryScore: { type: Number, required: true },
    lastRevisedAt: { type: Date, required: true },
    lastDecayAt: { type: Date, required: true }, 
    nextRevisionDate: { type: Date, required: true },

    revisionCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
