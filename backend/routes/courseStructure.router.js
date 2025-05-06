const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const {
  newTopic,
  editTopicOrder,
  editTopic,
  deleteTopic,
} = require("../controllers/topic.controller");
const {
  newSubTopic,
  editSubtopicOrder,
  editSubtopic,
  deleteSubtopic,
} = require("../controllers/subtopic.controller");
const {
  newStep,
  getStep,
  deleteStep,
  uploadImage,
  uploadVideo,
  upladFile,
  saveContent,
  updateContent,
  getTest,
} = require("../controllers/step.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

router.post("/upload-image", upload.single("file"), uploadImage);
router.post("/upload-video", upload.single("file"), uploadVideo);
router.post("/upload-file", upload.single("file"), upladFile);
router.post("/save-content", saveContent);
router.post("/update-content", updateContent);

router.post("/newTopic", newTopic);
router.post("/editTopicOrder", editTopicOrder);
router.post("/editTopic", editTopic);
router.post("/deleteTopic/:topicId", deleteTopic);

router.post("/newSubtopic", newSubTopic);
router.post("/editSubtopicOrder", editSubtopicOrder);
router.post("/editSubtopic", editSubtopic);
router.post("/deleteSubtopic/:subtopicId", deleteSubtopic);

router.get("/getTest/:testId", getTest);

// router.post("/newStep", newStep);
router.get("/getStep/:stepId", getStep);
router.post("/deleteStep/:stepId", deleteStep);

module.exports = router;
