exports.calculateAssessmentScore = (a) => {
  const score =
    0.25 * a.q1 +
    0.20 * a.q2 +
    0.20 * a.q3 +
    0.20 * a.q4 +
    0.15 * a.q5;

  return Math.min(100, Math.max(0, Math.round(score)));
};
exports.getDecayRate = (score) => {
  if (score >= 80) return 1;
  if (score >= 60) return 2;
  if (score >= 40) return 3;
  return 4;
};
exports.applyDecay = (score, days) => {
  const decayRate = exports.getDecayRate(score);
  const decayed = score - days * decayRate;
  return Math.max(0, Math.round(decayed));
};
exports.calculateNextRevisionDate = (score) => {
  const days = Math.max(1, Math.round((score / 100) * 7));
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
