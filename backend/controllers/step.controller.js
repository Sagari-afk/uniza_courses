const { sequelize, Step } = require("../models");
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

// ????
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

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }
  const fileName = `textContent${subtopicId}Subtopic${stepTitle}.html`;
  fs.writeFile(path.join(saveDir, fileName), content, (err) => {
    if (err) {
      console.error("Error saving content:", err);
      return res.status(500).json({ error: "Error saving content" });
    }
  });

  const order = (await Step.count({ where: { subtopicId } })) + 1;

  try {
    const step = await Step.create({
      title: stepTitle,
      subtopicId,
      order,
      fileName,
    });

    return res.json(step);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updateContent = async (req, res) => {
  const { subtopicId, content, stepTitle, stepId } = req.body;
  const saveDir = path.join(__dirname, "..", "saved");

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }
  const fileName = `textContent${subtopicId}Subtopic${stepTitle}.html`;
  fs.writeFile(path.join(saveDir, fileName), content, (err) => {
    if (err) {
      console.error("Error saving content:", err);
      return res.status(500).json({ error: "Error saving content" });
    }
  });

  try {
    const existingStep = await Step.findByPk(stepId);
    await existingStep.update({
      title: stepTitle,
      fileName,
    });

    return res.json(existingStep);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getStep = async (req, res) => {
  try {
    const record = await Step.findByPk(req.params.stepId);
    const step = record.toJSON();
    return res.status(200).json(step);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteStep = async (req, res) => {
  const stepId = req.params.stepId;
  const step = await Step.findByPk(req.params.stepId);
  console.log(step);

  const filePath = path.join(
    __dirname,
    "..",
    "saved",
    step.dataValues.fileName
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).json("Error deleting file:", err);
    }
    console.log("File deleted successfully");
  });
  try {
    await Step.destroy({ where: { id: stepId } });
    return res.json("Step deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  newStep,
  deleteStep,
  uploadImage,
  uploadVideo,
  upladFile,
  saveContent,
  getStep,
  updateContent,
};
