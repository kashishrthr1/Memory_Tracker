const Topic = require("../models/Topic");
const {
  calculateAssessmentScore,
  calculateNextRevisionDate
} = require("../utils/memoryScore");




exports.createTopicWithAssessment = async (req, res) => {
  try {
    const { name, q1, q2, q3, q4, q5 } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Topic name required" });
    }

    if ([q1, q2, q3, q4, q5].some(v => v === undefined)) {
      return res.status(400).json({ message: "Assessment is mandatory" });
    }

    const memoryScore = calculateAssessmentScore({ q1, q2, q3, q4, q5 });
    const nextRevisionDate = calculateNextRevisionDate(memoryScore);

    const topic = await Topic.create({
      user: req.user._id,
      name,
      memoryScore,
      lastUpdatedAt: new Date(),
      nextRevisionDate
    });

    res.status(201).json({
      message: "Topic created successfully",
      topic
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
