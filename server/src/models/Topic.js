const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    memoryScore: {
      type: Number,
      default: 0
    },
    nextRevisionDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
