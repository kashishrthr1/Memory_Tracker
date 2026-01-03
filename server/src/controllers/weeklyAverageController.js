const mongoose = require("mongoose");
const MemoryHistory = require("../models/MemoryHistory");

// Date helpers
const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay(); 
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getToday = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

exports.getWeeklyAverageMemoryScore = async (req, res) => {
  try {
    const startOfWeek = getStartOfWeek();
    const today = getToday();

    const data = await MemoryHistory.aggregate([
      {
        $match: {
          // Middleware se aayi user ID ko ObjectId mein convert karna safe rehta hai
          user: new mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startOfWeek, $lte: today }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          dailyAvg: { $avg: "$memoryScore" }
        }
      },
      {
        $group: {
          _id: null,
          weeklyAvg: { $avg: "$dailyAvg" }
        }
      }
    ]);

    res.json({
      weekStart: startOfWeek,
      weekEnd: today,
      averageMemoryScore: data[0] ? Math.round(data[0].weeklyAvg * 10) / 10 : 0
    });

  } catch (err) {
    console.error("Aggregation Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};