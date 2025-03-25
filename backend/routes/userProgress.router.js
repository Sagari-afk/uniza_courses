const express = require("express");
const {
  getLastUserProgress,
  addLastUserProgress,
  setStepCompleted,
  nextStep,
  changeSubtopic,
  getCompletedStatus,
} = require("../controllers/userProgress");

const router = express.Router();

router.get("/getLastUserProgress/:courseId/:userId", getLastUserProgress);
router.get("/getCompletedStatus/:stepId/:userId", getCompletedStatus);

router.post("/addLastUserProgress", addLastUserProgress);
router.post("/setStepCompleted/:stepId/:userId", setStepCompleted);
router.post("/nextStep", nextStep);
router.post("/changeSubtopic", changeSubtopic);

module.exports = router;
