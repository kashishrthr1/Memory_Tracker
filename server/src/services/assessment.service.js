// Calculate average score and difficulty from assessment responses
function analyzeAssessment(responses) {
  const avg = responses.reduce((a,b) => a + b) / responses.length;

  const variance = responses.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / responses.length;
  const stdDev = Math.sqrt(variance);

  const difficulty = (1 - avg / 100) * 0.7 + (stdDev / 100) * 0.3;

  return { averageScore: avg, difficulty };
}

// Calculate stability for this topic after revision
function calculateStability({ difficulty, revisionCount, averageScore }) {
  const baseStability = 1 + (1 - difficulty) * 9;
  const multiplier = Math.pow(2.5, revisionCount);
  const perfFactor = 0.5 + (averageScore / 200);
  return baseStability * multiplier * perfFactor;
}

module.exports = { analyzeAssessment, calculateStability };
