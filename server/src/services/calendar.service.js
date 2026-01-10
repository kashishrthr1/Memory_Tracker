const { calculateCurrentScore, calculateOptimalDate } = require('./memory.service');

function getFiveDayCalendar(topics) {
  const now = new Date();
  const calendar = {}; // Array ki jagah Object use karein

  // Initialize 5 days with date strings as keys
  for (let i = 0; i < 5; i++) {
    const day = new Date();
    day.setDate(now.getDate() + i);
    const dateKey = day.toLocaleDateString('en-CA');// Format: YYYY-MM-DD
    calendar[dateKey] = [];
  }

  topics.forEach(topic => {
    const optimalDate = calculateOptimalDate(topic);
    const dateKey = optimalDate.toLocaleDateString('en-CA');

    // Check if the optimal date is within our 5-day window
    if (calendar[dateKey]) {
      const currentScore = Math.round(calculateCurrentScore(topic));
      calendar[dateKey].push({
        id: topic._id,
        name: topic.topicName, // Frontend 'name' expect kar raha hai
        currentScore,
        status: currentScore >= 70 ? 'healthy' : currentScore >= 60 ? 'review-soon' : 'urgent'
      });
    }
  });

  return calendar;
}
module.exports={getFiveDayCalendar};