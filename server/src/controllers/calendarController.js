// controllers/calendarController.js
const Topic = require("../models/Topic");
exports.getRevisionCalendar = async (req, res) => {
  const topics = await Topic.find({ user: req.user._id });

  const calendar = {};

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split("T")[0];
    calendar[key] = [];
  }

  topics.forEach(topic => {
    const key = topic.nextRevisionDate
      ?.toISOString()
      .split("T")[0];

    if (calendar[key]) {
      calendar[key].push({
        id: topic._id,
        name: topic.name,
        score: topic.memoryScore
      });
    }
  });

  res.json(calendar);
};
