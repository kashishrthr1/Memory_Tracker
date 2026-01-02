const cron = require("node-cron");
const Topic = require("../models/Topic");
const MemoryHistory = require("../models/MemoryHistory");
const { applyDecay } = require("../utils/memoryScore");

const ONE_DAY = 24 * 60 * 60 * 1000;

const getNormalizedDate = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

cron.schedule("0 0 * * *", async () => {
    console.log("🕛 Running daily memory decay cron");
    const today = getNormalizedDate(); // Always use 00:00:00

    const topics = await Topic.find();

    for (const topic of topics) {
        const daysPassed = Math.floor((Date.now() - topic.lastDecayAt) / ONE_DAY);

        // Agar aaj hi revise hua hai (daysPassed 0), toh skip decay
        if (daysPassed <= 0) continue;

        const newScore = applyDecay(topic.memoryScore, daysPassed);

        // Update topic
        topic.memoryScore = newScore;
        topic.lastDecayAt = new Date();
        topic.nextRevisionDate = (newScore === 0 || topic.nextRevisionDate < today) 
            ? today 
            : calculateNextRevisionDate(newScore);
        
        await topic.save();

        // Update History point for the graph
        await MemoryHistory.findOneAndUpdate(
            { user: topic.user, topic: topic._id, date: today },
            { memoryScore: newScore },
            { upsert: true }
        );
    }
    console.log("✅ Memory decay applied and history updated");
});