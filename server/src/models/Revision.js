const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic"
    },
    type: {
      type: String,
      enum: ["FIRST_TIME", "REVISION"]
    },
    memoryScoreAfter: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Revision", revisionSchema);
