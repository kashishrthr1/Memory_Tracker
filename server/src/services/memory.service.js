function calculateScoreAtDate(topic, targetDate) {
  const target = new Date(targetDate);
  const createdAt = new Date(topic.createdAt);

  if (target < createdAt) return NaN;

  const pastRevisions = topic.revisionHistory
    .filter((rev) => new Date(rev.date) <= target)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let startScore, startDate;

  if (pastRevisions.length === 0) {
    startScore = topic.baseMemoryScore;
    startDate = createdAt;
  } else {
    const latestRev = pastRevisions[pastRevisions.length - 1];
    startScore = latestRev.scoreAfterRevision;
    startDate = new Date(latestRev.date);
  }

  const daysSince = Math.max(0, (target - startDate) / (1000 * 60 * 60 * 24));
  const retention = Math.exp(-daysSince / topic.stability);

  return startScore * retention;
}

function calculateCurrentScore(topic, now = new Date()) {
  return calculateScoreAtDate(topic, now);
}

function calculateOptimalDate(topic, targetScore = 60) {
  const now = new Date();
  const currentScore = calculateCurrentScore(topic, now);

  // If current score is already at or below target, revision is needed TODAY
  if (currentScore <= targetScore) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  // Calculate when score will decay from CURRENT state to target
  const targetRetention = targetScore / topic.baseMemoryScore;
  const daysUntil = -topic.stability * Math.log(targetRetention);

  // Calculate from last revision
  const optimalDate = new Date(topic.lastRevisedAt);
  optimalDate.setDate(optimalDate.getDate() + Math.max(1, Math.floor(daysUntil)));
  optimalDate.setHours(0, 0, 0, 0);

  // If calculated date is in the past, return today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (optimalDate < today) {
    return today;
  }

  return optimalDate;
}

module.exports = {
  calculateScoreAtDate,
  calculateCurrentScore,
  calculateOptimalDate
};