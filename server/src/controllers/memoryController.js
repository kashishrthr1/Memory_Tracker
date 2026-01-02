const MemoryHistory = require("../models/MemoryHistory");

// GET memory score graph for a topic
exports.getMemoryGraph = async (req, res) => {
  try {
    const { topicId } = req.params;

    const history = await MemoryHistory.find({
      user: req.user._id,
      topic: topicId
    })
      .sort({ date: 1 }) // oldest → latest
      .select("memoryScore date -_id");

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
