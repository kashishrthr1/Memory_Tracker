const Topic = require("../models/Topic");
const Assessment = require("../models/Assessment");
const Revision = require("../models/Revision");

const { calculateMemoryScore } = require("../services/memoryScoreService");
const { getNextRevisionDate } = require("../services/revisionPlannerService");

exports.createTopic = async (req, res) => {
  try {
    const { name, confidence, recallSpeed, clarity } = req.body;

    if (!name || !confidence || !recallSpeed || !clarity) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ Create Topic
    const topic = await Topic.create({
      name,
      user: req.user._id
    });

    // 2️⃣ Calculate memory score
    const memoryScore = calculateMemoryScore({
      confidence,
      recallSpeed,
      clarity
    });

    // 3️⃣ Save assessment
    await Assessment.create({
      user: req.user._id,
      topic: topic._id,
      confidence,
      recallSpeed,
      clarity,
      calculatedScore: memoryScore
    });

    // 4️⃣ Update topic
    topic.memoryScore = memoryScore;
    topic.nextRevisionDate = getNextRevisionDate(memoryScore);
    await topic.save();

    // 5️⃣ Create revision log
    await Revision.create({
      user: req.user._id,
      topic: topic._id,
      type: "FIRST_TIME",
      memoryScoreAfter: memoryScore
    });

    res.status(201).json({
      message: "Topic created successfully",
      topic
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
