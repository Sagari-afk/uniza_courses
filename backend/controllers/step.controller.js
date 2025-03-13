const { sequelize, Step } = require("../models");
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const newStep = [
  body("title").not().isEmpty(),
  body("subtopicId").not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      return res.status(400).json(errMessage);
    }

    const { title, subtopicId } = req.body;
    const order = (await Step.count({ where: { subtopicId } })) + 1;

    try {
      const topic = await Step.create({
        title,
        subtopicId,
        order,
      });

      return res.json(topic);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ link: fileUrl });
};

const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `http://localhost:3000/uploads/video/${req.file.filename}`;
  res.json({ link: fileUrl });
};

const upladFile = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `http://localhost:3000/uploads/files/${req.file.filename}`;
  res.json({ link: fileUrl });
};

const saveContent = async (req, res) => {
  const { subtopicId, content, stepTitle } = req.body;
  const saveDir = path.join(__dirname, "..", "saved");
  console.log("subtopicId", subtopicId);
  console.log("content", content);
  console.log("stepTitle", stepTitle);

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }
  fs.writeFile(path.join(saveDir, "content.html"), content, (err) => {
    if (err) {
      console.error("Error saving content:", err);
      return res.status(500).json({ error: "Error saving content" });
    }
  });

  const order = (await Step.count({ where: { subtopicId } })) + 1;

  try {
    const topic = await Step.create({
      title: stepTitle,
      subtopicId,
      order,
    });

    return res.json(topic);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = { newStep, uploadImage, uploadVideo, upladFile, saveContent };
