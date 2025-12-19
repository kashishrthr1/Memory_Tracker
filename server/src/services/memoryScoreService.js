exports.calculateMemoryScore = ({ confidence, recallSpeed, clarity }) => {
  const score =
    confidence * 0.4 +
    recallSpeed * 0.3 +
    clarity * 0.3;

  return Math.round(score * 20); // scale to 0–100
};
