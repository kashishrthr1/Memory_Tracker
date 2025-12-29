const mongoose = require("mongoose");

const memoryHistorySchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  memoryScore: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("MemoryHistory", memoryHistorySchema);
