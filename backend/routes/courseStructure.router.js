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

// router.get("/addStep/text", (req, res) => {
//   fs.readFile(
//     path.join(__dirname, "saved", "content.html"),
//     "utf8",
//     (err, data) => {
//       if (err) {
//         console.error("Error reading content:", err);
//         return res.status(500).json({ error: "Error reading content" });
//       }
//       res.json({ content: data });
//     }
//   );
// });

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

router.get("/getHtmlContent/:fileUrl", (req, res) => {
  try {
    const fileUrl = req.params.fileUrl;
    if (!fileUrl) {
      return res.status(400).json({ error: "File URL is required" });
    }

    const filePath = path.join(__dirname, "..", "/saved/", fileUrl);
    console.log("File path: ", filePath);

    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }
      console.log("Content: ", content);
      return res.status(200).json({ content });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

module.exports = router;
