const cron = require("node-cron");
const Topic = require("../models/Topic");
const MemoryHistory = require("../models/MemoryHistory");
const { applyDecay } = require("../utils/memoryScore");

const ONE_DAY = 24 * 60 * 60 * 1000;

cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running daily memory decay cron");

   const today = new Date();
  today.setHours(0, 0, 0, 0);


  const topics = await Topic.find();

  for (const topic of topics) {
    const daysPassed = Math.floor(
      (Date.now() - topic.lastDecayAt) / ONE_DAY
    );

    if (daysPassed <= 0) continue;

    const newScore = applyDecay(topic.memoryScore, daysPassed);

    // Save history for graph
    await MemoryHistory.create({
      user: topic.user,
      topic: topic._id,
      memoryScore: newScore,
      date: new Date()
    });

    topic.memoryScore = newScore;
    topic.lastDecayAt = new Date();
    if (
      newScore === 0 ||
      topic.nextRevisionDate < today
    ) {
      // Force revision today
      topic.nextRevisionDate = today;
    } 
    else {
     topic.nextRevisionDate = calculateNextRevisionDate(newScore);
    }

    await topic.save();
  }

  console.log("✅ Memory decay applied");
});
