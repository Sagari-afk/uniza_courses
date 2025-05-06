const express = require("express");
const {
  getLastUserProgress,
  addLastUserProgress,
  setStepCompleted,
  nextStep,
  changeSubtopic,
  getCompletedStatus,
  getIsStarted,
  submitTestResults,
  getTestResults,
  getCoursesInProgress,
  getCompletedCourses,
} = require("../controllers/userProgress");

const router = express.Router();

router.get("/getLastUserProgress/:courseId/:userId", getLastUserProgress);
router.get("/getCompletedStatus/:stepId/:userId", getCompletedStatus);
router.get("/getIsStarted/:courseId/:userId", getIsStarted);
router.get("/getTestResults/:stepId/:userId", getTestResults);
router.get("/coursessInProgress/:userId", getCoursesInProgress);
router.get("/completedCourses/:userId", getCompletedCourses);

router.post("/addLastUserProgress", addLastUserProgress);
router.post("/setStepCompleted/:stepId/:userId", setStepCompleted);
router.post("/nextStep", nextStep);
router.post("/changeSubtopic", changeSubtopic);
router.post("/submitTestResults", submitTestResults);

module.exports = router;
