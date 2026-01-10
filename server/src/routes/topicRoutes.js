const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createTopic, getTopics, reviseTopic, getFiveDayRevision, getDashboardStats,getRecentActivities,getTopicHistory,deleteTopic } = require('../controllers/topicController');


router.post("/", protect, createTopic);
router.post("/:id/revise", protect, reviseTopic);
router.get("/", protect, getTopics);
router.get('/calendar/5days', protect, getFiveDayRevision);
router.get('/dashboardScore', protect, getDashboardStats);
router.get("/recentActivity",protect,getRecentActivities);
router.get("/:id/history",protect,getTopicHistory);
// @route   DELETE /api/topics/:id
router.delete('/:id', protect, deleteTopic);

module.exports = router;













