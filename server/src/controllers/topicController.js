const Topic = require("../models/Topic");
const MemoryHistory=require("../models/MemoryHistory")
const {
  calculateAssessmentScore,
  calculateNextRevisionDate
} = require("../utils/memoryScore");


const getNormalizedDate = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

exports.createTopicWithAssessment = async (req, res) => {
    try {
        const { name, q1, q2, q3, q4, q5 } = req.body;
        const historyDate = getNormalizedDate();

        if (!name) return res.status(400).json({ message: "Topic name required" });
        if ([q1, q2, q3, q4, q5].some(v => v === undefined)) {
            return res.status(400).json({ message: "Assessment is mandatory" });
        }

        const memoryScore = calculateAssessmentScore({ q1, q2, q3, q4, q5 });
        const nextRevisionDate = calculateNextRevisionDate(memoryScore);

        const topic = await Topic.create({
            user: req.user._id,
            name,
            memoryScore,
            lastRevisedAt: new Date(),
            lastDecayAt: new Date(),
            nextRevisionDate,
            revisionCount: 1
        });

        // Use findOneAndUpdate here too! 
        // Takki agar user ne same day pehle delete karke fir banaya ho toh duplication na ho
        await MemoryHistory.findOneAndUpdate(
            { user: req.user._id, topic: topic._id, date: historyDate },
            { memoryScore: memoryScore },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: "Topic created successfully", topic });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserTopics = async (req, res) => {
  try {
    // req.user._id is populated by your protect middleware
    const topics = await Topic.find({ user: req.user._id })
      .sort({ memoryScore: 1 }); // Sort by lowest score first for revision priority

    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching topics", error: err.message });
  }
};

exports.reviseTopic = async (req, res) => {
    try {
        const { q1, q2, q3, q4, q5 } = req.body;
        const historyDate = getNormalizedDate();

        if ([q1, q2, q3, q4, q5].some(v => v === undefined)) {
            return res.status(400).json({ message: "All assessment answers required" });
        }

        const topic = await Topic.findOne({ _id: req.params.id, user: req.user._id });
        if (!topic) return res.status(404).json({ message: "Topic not found" });

        // 1️⃣ Apply decay
        const daysPassed = Math.floor((Date.now() - topic.lastRevisedAt) / (1000 * 60 * 60 * 24));
        let decayedScore = topic.memoryScore;
        if (daysPassed > 0) {
            let decayRate = decayedScore >= 80 ? 1 : decayedScore >= 60 ? 2 : decayedScore >= 40 ? 3 : 4;
            decayedScore = Math.max(0, decayedScore - daysPassed * decayRate);
        }

        // 2️⃣ New score & Blend
        const newScore = calculateAssessmentScore({ q1, q2, q3, q4, q5 });
        const updatedScore = Math.round(0.6 * newScore + 0.4 * decayedScore);

        // 3️⃣ Update topic
        topic.memoryScore = updatedScore;
        topic.lastRevisedAt = new Date();
        topic.lastDecayAt = new Date();
        topic.nextRevisionDate = calculateNextRevisionDate(updatedScore);
        topic.revisionCount += 1;
        await topic.save();

        // 4️⃣ Update/Upsert History
        await MemoryHistory.findOneAndUpdate(
            { user: req.user._id, topic: topic._id, date: historyDate },
            { memoryScore: updatedScore },
            { upsert: true, new: true }
        );

        res.status(200).json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};