const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createTopicWithAssessment } = require("../controllers/topicController");

router.post("/", protect, createTopicWithAssessment);

module.exports = router;














