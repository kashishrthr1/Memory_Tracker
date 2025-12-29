const Topic = require("../models/Topic");
const Revision = require("../models/Revision");
const {
  calculateAssessmentScore,
  calculateNextRevisionDate
} = require("../utils/memoryScore");

exports.createTopicWithAssessment = async (userId, name, assessment) => {
  // 1. Calculate memory score
  const memoryScore = calculateAssessmentScore(assessment);

  // 2. Calculate next revision date
  const nextRevisionDate = calculateNextRevisionDate(memoryScore);

  // 3. Create topic
  const topic = await Topic.create({
    user: userId,
    name,
    memoryScore,
    lastUpdatedAt: new Date(),
    nextRevisionDate,
    revisionCount: 1
  });

  // 4. Create FIRST_TIME revision
  await Revision.create({
    user: userId,
    topic: topic._id,
    type: "FIRST_TIME",
    memoryScoreBefore: null,
    memoryScoreAfter: memoryScore,
    assessment
  });

  return topic;
};
