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



exports.reviseTopic = async (req, res) => {
  const { q1, q2, q3, q4, q5 } = req.body;

  if ([q1, q2, q3, q4, q5].some(v => v === undefined)) {
    return res.status(400).json({ message: "All assessment answers required" });
  }

  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ message: "Topic not found" });
  }

  // 1️⃣ Apply decay
  const daysPassed =
    Math.floor((Date.now() - topic.lastRevisedAt) / (1000 * 60 * 60 * 24));

  let decayedScore = topic.memoryScore;
  if (daysPassed > 0) {
    let decayRate =
      decayedScore >= 80 ? 1 :
      decayedScore >= 60 ? 2 :
      decayedScore >= 40 ? 3 : 4;

    decayedScore = Math.max(0, decayedScore - daysPassed * decayRate);
  }

  // 2️⃣ New assessment score
  const newScore = calculateAssessmentScore({q1, q2, q3, q4, q5});

  // 3️⃣ Blend old + new
  const updatedScore = Math.round(0.6 * newScore + 0.4 * decayedScore);

  // 4️⃣ Update topic
  topic.memoryScore = updatedScore;
  topic.lastRevisedAt = new Date();  
  topic.lastDecayAt = new Date();
  topic.nextRevisionDate = calculateNextRevisionDate(updatedScore);
  topic.revisionCount += 1;

  await topic.save();

  await MemoryHistory.create({
    user: topic.user,
    topic: topic._id,
    memoryScore: updatedScore,
    date: new Date()
  });

  res.json({
    message: "Revision recorded successfully",
    topic
  });
};
