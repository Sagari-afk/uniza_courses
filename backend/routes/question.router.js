const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  uploadImage,
  uploadVideo,
  addQuestion,
  getQuestions,
  setQuestionOpened,
  setQuestionText,
  createAnswer,
  deleteAnswer,
  getAnswers,
  getQuestionHtmlContent,
  getQuestion,
  answerUpdate,
  deleteQuestion,
} = require("../controllers/questions.controller");

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

router.get("/getQuestions/:stepId", getQuestions);

router.get("/getQuestion/:questionId", getQuestion);
router.delete("/deleteQuestion/:questionId", deleteQuestion);

router.post("/addQuestion", addQuestion);
router.post("/setQuestionOpened", setQuestionOpened);
router.post("/setQuestionText", setQuestionText);
router.post("/upload-image", upload.single("file"), uploadImage);
router.post("/upload-video", upload.single("file"), uploadVideo);
router.get("/getQuestionHtmlContent/:fileUrl", getQuestionHtmlContent);

router.post("/createAnswer", createAnswer);
router.delete("/deleteAnswer/:answerId", deleteAnswer);
router.get("/getAnswers/:questionId", getAnswers);
router.post("/answerUpdate/:answerId", answerUpdate);

module.exports = router;
