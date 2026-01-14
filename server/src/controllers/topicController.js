const Topic = require('../models/Topic');
const { analyzeAssessment, calculateStability } = require('../services/assessment.service');
const { calculateCurrentScore, calculateOptimalDate,calculateScoreAtDate } = require('../services/memory.service');
const { getFiveDayCalendar } = require('../services/calendar.service');
const { getWeeklyStats } = require('../services/analytics.service');
const Activity = require('../models/Activity');


// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const { topicName, assessmentResponses } = req.body;

    const { averageScore, difficulty } = analyzeAssessment(assessmentResponses);
    const stability = calculateStability({ difficulty, revisionCount: 0, averageScore });

    const now = new Date();
    const topic = new Topic({
      userId: req.user.id,
      topicName,
      baseMemoryScore: averageScore,
      stability,
      difficulty,
      revisionCount: 0,
      lastRevisedAt: now,
      revisionHistory: [{
        date: now,
        scoreBeforeRevision: null,
        scoreAfterRevision: averageScore,
        daysSinceLastRevision: 0
      }]
    });

    await topic.save();
    await Activity.create({
      userId: req.user.id,
      topicName: topicName,
      activityType: 'added'
    });
    res.status(201).json({
      ...topic.toObject(),
      currentScore: Math.round(averageScore),
      optimalRevisionDate: calculateOptimalDate(topic)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all topics for user, with currentScore & optimalRevisionDate
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.user.id });

    const now = new Date();
     const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const results = topics.map(topic => {
      const currentScore = calculateCurrentScore(topic, now);

      let optimalDate = calculateOptimalDate(topic);
        if (!optimalDate || optimalDate < today) {
        optimalDate = today;
      }
      return {
        ...topic.toObject(),
        currentScore: Math.round(currentScore),
        optimalRevisionDate: optimalDate,
        status:
          currentScore >= 70 ? 'healthy' :
            currentScore >= 60 ? 'review-soon' :
              'urgent'
      };
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Revise a topic
exports.reviseTopic = async (req, res) => {
  try {
    const { assessmentResponses } = req.body;
    const topic = await Topic.findById(req.params.id);

    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    const now = new Date();
    const scoreBefore = calculateCurrentScore(topic, now);
    const { averageScore, difficulty: newDiff } = analyzeAssessment(assessmentResponses);

    const blendedDiff = (topic.difficulty * 0.5) + (newDiff * 0.5);
    const newStability = calculateStability({
      difficulty: blendedDiff,
      revisionCount: topic.revisionCount + 1,
      averageScore
    });

    const daysSince = (now - topic.lastRevisedAt) / (1000 * 60 * 60 * 24);

    topic.baseMemoryScore = averageScore;
    topic.stability = newStability;
    topic.difficulty = blendedDiff;
    topic.revisionCount += 1;
    topic.lastRevisedAt = now;

    topic.revisionHistory.push({
      date: now,
      scoreBeforeRevision: Math.round(scoreBefore),
      scoreAfterRevision: averageScore,
      daysSinceLastRevision: daysSince
    });

    const optimalDate = calculateOptimalDate(topic);
    console.log('📅 Optimal Date for', topic.topicName, ':', optimalDate.toISOString());

    const pointsDifference = Math.round(averageScore- scoreBefore);

let displayScore;
if (pointsDifference > 0) {
    displayScore = `+${pointsDifference}%`; // Standard gain
} else if (pointsDifference < 0) {
    displayScore = `${pointsDifference}%`; // Will show as "-5%"
} else {
    displayScore = "0%"; // No change
}

    await Activity.create({
      userId: req.user.id,
      topicName: topic.topicName,
      activityType: 'revised',
      scoreChange: displayScore
    });

    await topic.save();

    res.json({
      message: 'Revision saved! 🎉',
      improvementScore: Math.round(averageScore - scoreBefore),
      ...topic.toObject(),
      currentScore: Math.round(averageScore),
      optimalRevisionDate: optimalDate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getFiveDayRevision = async (req, res) => {
  try {
    const topics = await Topic.find({ userId: req.user.id });
    const calendar = getFiveDayCalendar(topics);
    res.json(calendar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const topics = await Topic.find({ userId: req.user.id });
        
        // Naya Stats helper call karein
        const stats = getWeeklyStats(topics);

        res.json({
            averageWeeklyMemoryScore: stats.averageWeeklyMemoryScore,
            trend: stats.trend
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getRecentActivities = async (req, res) => {
  try {
    // 1. Fetch activities linked to the user ID from the 'protect' middleware
    const activities = await Activity.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // 2. Newest first (Descending)
      .limit(5);             // 3. Limit to 10 for dashboard performance

    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch activities", 
      error: err.message 
    });
  }
};

exports.getTopicHistory = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const history = [];
    const now = new Date();
    const lookbackDays = 7; // Aap isse 10 ya 14 bhi kar sakte hain

    for (let i = lookbackDays; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(now.getDate() - i);
      
      // Din ke aakhir ka score nikalne ke liye time set karein
       if (i !== 0) {
        targetDate.setHours(23, 59, 59, 999);
      } else {
        // Aaj ke liye exact abhi ka waqt (now) rehne dein
        targetDate.setTime(now.getTime());
      }

      // Agar targetDate topic ke banne se pehle ki hai, toh use skip karein
      if (targetDate < new Date(topic.createdAt)) continue;

      // Aapka existing function yahan use hoga
      const score = calculateScoreAtDate(topic, targetDate);

      history.push({
        memoryScore: Math.round(score),
        date: targetDate.toISOString(), // Frontend friendly format
      });
    }

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Security: Ensure the user owns this topic
    // deleteTopic controller mein change karein:
       if (topic.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "User not authorized" });
    }

    // 1. Delete all activity logs related to this topic (Optional but recommended)
    await Activity.deleteMany({ topicName: topic.topicName, userId: req.user.id });

    // 2. Delete the topic
    await topic.deleteOne();

    res.json({ message: "Topic and associated activities deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
