const { sequelize, Step, Questions, Answers } = require("../models");
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
};

const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
};

const upladFile = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
};

const saveContent = async (req, res) => {
  const { subtopicId, content, stepTitle, type } = req.body;
  let fileName;

  const order = (await Step.count({ where: { subtopicId } })) + 1;

  try {
    const step = await Step.create({
      title: stepTitle,
      subtopicId,
      order,
      fileName,
      type,
      content,
    });

    return res.json(step);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updateContent = async (req, res) => {
  const { content, stepTitle, stepId } = req.body;
  console.log("DATA FROM FRONTEND: ", req.body);

  try {
    const existingStep = await Step.findByPk(stepId);
    await existingStep.update({
      title: stepTitle,
      content,
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
    return res.status(200).json(record);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteStep = async (req, res) => {
  const stepId = req.params.stepId;
  const step = await Step.findByPk(req.params.stepId);
  console.log(step);

  // if (step.dataValues.fileName) {
  //   const filePath = path.join(
  //     __dirname,
  //     "..",
  //     "saved",
  //     step.dataValues.fileName
  //   );

  //   fs.unlink(filePath, (err) => {
  //     if (err) {
  //       console.error("Error deleting file:", err);
  //       return res.status(500).json("Error deleting file:", err);
  //     }
  //     console.log("File deleted successfully");
  //   });
  // }
  try {
    await Step.destroy({ where: { id: stepId } });
    return res.json("Step deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getTest = async (req, res) => {
  try {
    const record = await Step.findByPk(req.params.testId, {
      include: [
        {
          model: Questions,
          as: "questions",
          include: [
            {
              model: Answers,
            },
          ],
        },
      ],
    });

    return res.status(200).json(record);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  deleteStep,
  uploadImage,
  uploadVideo,
  upladFile,
  saveContent,
  getStep,
  updateContent,
  getTest,
};
