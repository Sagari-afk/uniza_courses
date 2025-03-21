const express = require("express");
const {
  getLastUserProgress,
  addLastUserProgress,
} = require("../controllers/userProgress");

const router = express.Router();

router.get("/getLastUserProgress", getLastUserProgress);
router.post("/addLastUserProgress", addLastUserProgress);

module.exports = router;
