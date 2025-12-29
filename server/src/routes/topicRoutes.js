const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createTopicWithAssessment } = require("../controllers/topicController");
const { reviseTopic } = require("../controllers/topicController");
const { getRevisionCalendar } = require("../controllers/calendarController");

router.post("/", protect, createTopicWithAssessment);
router.post("/:id/revise", protect, reviseTopic);
router.get("/revision-calendar", protect, getRevisionCalendar);

module.exports = router;














