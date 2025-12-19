const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { createTopic } = require("../controllers/topicController");

router.post("/", protect, createTopic);

module.exports = router;













