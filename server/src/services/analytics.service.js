const { calculateScoreAtDate } = require('./memory.service');

function getWeeklyAverageScore(topics) {
  const today = new Date();
  let weeklyTotal = 0;
  let validDays = 0;

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    let dailySum = 0;
    let count = 0;

    topics.forEach(topic => {
      const score = calculateScoreAtDate(topic, day);
      if (!isNaN(score)) {
        dailySum += score;
        count++;
      }
    });

    if (count > 0) {
      weeklyTotal += dailySum / count;
      validDays++;
    }
  }

  return validDays === 0
    ? 0
    : Math.round(weeklyTotal / validDays);
}

module.exports = { getWeeklyAverageScore };
