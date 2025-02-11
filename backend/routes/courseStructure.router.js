const express = require("express");
const { newTopic } = require("../controllers/topic.controller");
const { newSubTopic } = require("../controllers/subtopic.controller");
const { newStep } = require("../controllers/step.controller");

const router = express.Router();

router.post("/newTopic", newTopic);
router.post("/newSubtopic", newSubTopic);
router.post("/newStep", newStep);

module.exports = router;
