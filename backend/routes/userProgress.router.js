const express = require("express");
const {
  getLastUserProgress,
  addLastUserProgress,
} = require("../controllers/userProgress");

const router = express.Router();

router.get("/getLastUserProgress/:courseId/:userId", getLastUserProgress);
router.post("/addLastUserProgress", addLastUserProgress);

module.exports = router;
