const { calculateScoreAtDate } = require('./memory.service');


// Helper function: Kisi bhi ek specific date ka average nikalne ke liye
function getAverageForDate(topics, date) {
    let dailySum = 0;
    let count = 0;

    topics.forEach(topic => {
        const score = calculateScoreAtDate(topic, date);
        if (!isNaN(score)) {
            dailySum += score;
            count++;
        }
    });

    return count > 0 ? (dailySum / count) : null;
}

function getWeeklyStats(topics) {
    const today = new Date();
    let currentWeekTotal = 0;
    let currentValidDays = 0;

    // 1. Current Week Average (Last 7 days: 0-6)
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        if (i > 0) day.setHours(23, 59, 59, 999);

        const dailyAvg = getAverageForDate(topics, day);
        if (dailyAvg !== null) {
            currentWeekTotal += dailyAvg;
            currentValidDays++;
        }
    }

    const currentWeeklyAvg = currentValidDays === 0 ? 0 : (currentWeekTotal / currentValidDays);

    // 2. Previous Week Average (Days 7-13)
    let previousWeekTotal = 0;
    let previousValidDays = 0;

    for (let i = 7; i < 14; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        day.setHours(23, 59, 59, 999);

        const dailyAvg = getAverageForDate(topics, day);
        if (dailyAvg !== null) {
            previousWeekTotal += dailyAvg;
            previousValidDays++;
        }
    }

    const previousWeeklyAvg = previousValidDays === 0 ? 0 : (previousWeekTotal / previousValidDays);

    // 3. Calculate Trend (Week-over-Week comparison)
    const trend = previousWeeklyAvg !== 0 
        ? Math.round(currentWeeklyAvg - previousWeeklyAvg) 
        : 0;

    return {
        averageWeeklyMemoryScore: Math.round(currentWeeklyAvg),
        trend: trend
    };
}
module.exports={getWeeklyStats};