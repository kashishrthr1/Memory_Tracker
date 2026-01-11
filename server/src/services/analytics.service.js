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
    let weeklyTotal = 0;
    let validDays = 0;

    // 1. Current Weekly Average Calculate karna (Pichle 7 din ka moving average)
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        if (i > 0) day.setHours(23, 59, 59, 999);

        const dailyAvg = getAverageForDate(topics, day);
        if (dailyAvg !== null) {
            weeklyTotal += dailyAvg;
            validDays++;
        }
    }

    const currentWeeklyAvg = validDays === 0 ? 0 : (weeklyTotal / validDays);

    // 2. Trend Logic: Pichle hafte (7 days ago) ka comparison point
    // Hum dekh rahe hain ki 7 din pehle user ka "Daily Average" kya tha
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(23, 59, 59, 999);

    const pastAvg = getAverageForDate(topics, sevenDaysAgo);

    // Trend = Current - Past (e.g., 29% - 0% = +29)
    // Agar koi past data nahi hai (naya user), toh trend 0 dikhayenge
    const trend = pastAvg !== null ? Math.round(currentWeeklyAvg - pastAvg) : 0;

    return {
        averageWeeklyMemoryScore: Math.round(currentWeeklyAvg),
        trend: trend
    };
}
module.exports={getWeeklyStats};