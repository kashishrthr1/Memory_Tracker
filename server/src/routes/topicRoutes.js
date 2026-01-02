const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createTopicWithAssessment,getUserTopics } = require("../controllers/topicController");
const { reviseTopic } = require("../controllers/topicController");
const { getRevisionCalendar } = require("../controllers/calendarController");
const { getMemoryGraph } = require("../controllers/memoryController");

router.post("/", protect, createTopicWithAssessment);
router.post("/:id/revise", protect, reviseTopic);
router.get("/revision-calendar", protect, getRevisionCalendar);
router.get("/", protect, getUserTopics);
router.get("/graph/:topicId", protect, getMemoryGraph);

module.exports = router;













