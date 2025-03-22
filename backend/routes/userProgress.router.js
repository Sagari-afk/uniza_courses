const express = require("express");
const {
  getLastUserProgress,
  addLastUserProgress,
  setStepCompleted,
  nextStep,
} = require("../controllers/userProgress");

const router = express.Router();

router.get("/getLastUserProgress/:courseId/:userId", getLastUserProgress);

router.post("/addLastUserProgress", addLastUserProgress);
router.post("/setStepCompleted/:stepId/:userId", setStepCompleted);
router.post("/nextStep", nextStep);

module.exports = router;
