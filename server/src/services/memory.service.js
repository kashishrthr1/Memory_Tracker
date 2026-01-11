// Calculate current memory score using Ebbinghaus forgetting curve
function calculateScoreAtDate(topic, targetDate) {
  const target = new Date(targetDate);
  const createdAt = new Date(topic.createdAt);

   if (target < createdAt) return NaN;
  // 1. Agar target date topic banne se pehle ki hai, toh 0 ya null return karo
  

  // 2. Woh saari revisions nikaalo jo is target date se pehle ya is din hui thi
  // 'revisionHistory' array aapke Topic model mein store hai
  const pastRevisions = topic.revisionHistory
    .filter((rev) => new Date(rev.date) <= target)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let startScore, startDate;

  if (pastRevisions.length === 0) {
    // Agar koi revision nahi mili (matlab topic naya hai), 
    // toh creation date se decay calculate karo
    startScore = topic.baseMemoryScore;
    startDate = createdAt;
  } else {
    // Sabse latest revision lo jo target date se pehle hui thi
    const latestRev = pastRevisions[pastRevisions.length - 1];
    startScore = latestRev.scoreAfterRevision;
    startDate = new Date(latestRev.date);
  }

  // 3. Time difference nikaalo (Target Date aur Revision Date ke beech)
  const daysSince = Math.max(0,(target - startDate) / (1000 * 60 * 60 * 24));

  // 4. Ebbinghaus Forgetting Curve apply karo
  // Stability har revision ke baad badhti hai, isliye graph flatter dikhega
  const retention = Math.exp(-daysSince / topic.stability);
  
  return startScore * retention;
}

function calculateCurrentScore(topic, now = new Date()) {
  return calculateScoreAtDate(topic, now);
}

function calculateOptimalDate(topic, targetScore = 60) {
  // If already at or below target, urgent revision needed!
  if (topic.baseMemoryScore <= targetScore) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today;
  }

  // Calculate when score will decay to target
  const targetRetention = targetScore / topic.baseMemoryScore;
  const daysUntil = -topic.stability * Math.log(targetRetention);
  
  const date = new Date(topic.lastRevisedAt);
  date.setDate(date.getDate() + Math.max(1, Math.floor(daysUntil)));
  date.setUTCHours(0, 0, 0, 0);
  
  return date;
}

module.exports = {
  calculateScoreAtDate,
  calculateCurrentScore,
  calculateOptimalDate
};
