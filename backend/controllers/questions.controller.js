const path = require("path");
const { sequelize, Questions, Answers } = require("../models");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

const addQuestion = [
  body("stepId").not().isEmpty(),
  body("opened").not(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      console.log(errors);
      return res.status(400).json(errMessage);
    }

    const { stepId, opened } = req.body;
    console.log("stepId: ", stepId);
    console.log("opened: ", opened);
    const order = (await Questions.count({ where: { stepId } })) + 1;

    try {
      const question = await Questions.create({
        stepId,
        opened,
        order,
      });

      return res.json(question);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const setQuestionText = [
  body("questionId").not().isEmpty(),
  body("content").not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      console.log(errors);
      return res.status(400).json(errMessage);
    }

    const { questionId, content } = req.body;

    const saveDir = path.join(__dirname, "..", "saved/questions");

    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }
    const fileName = `questionContent${questionId}.html`;
    fs.writeFile(path.join(saveDir, fileName), content, (err) => {
      if (err) {
        console.error("Error saving content:", err);
        return res.status(500).json({ error: "Error saving content" });
      }
    });

    try {
      const question = await Questions.update(
        { questionFileName: fileName },
        { where: { id: questionId } }
      );

      return res.json(question);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const setQuestionOpened = [
  body("questionId").not().isEmpty(),
  body("opened").isBoolean(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      console.log(errors);
      return res.status(400).json(errMessage);
    }

    const { questionId, opened } = req.body;

    try {
      const question = await Questions.update(
        { opened },
        { where: { id: questionId } }
      );

      return res.json(question);
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

const getQuestions = async (req, res) => {
  const { stepId } = req.params;
  console.log("stepId: ", stepId);
  try {
    const questions = await Questions.findAll({
      where: { stepId },
      order: [["order", "ASC"]],
      include: [
        {
          model: Answers,
          required: false,
        },
      ],
    });

    return res.json(questions);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const createAnswer = async (req, res) => {
  const { questionId, answerText, isCorrect } = req.body;
  console.log("questionId: ", questionId);
  console.log("answerText: ", answerText);
  console.log("isCorrect: ", isCorrect);

  try {
    const answer = await Answers.create({
      questionId,
      contentFileName: "",
      correctAnswer: isCorrect,
    });

    return res.json(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteAnswer = async (req, res) => {
  const { answerId } = req.params;
  console.log("Deleting answer with id: ", answerId);

  try {
    const answer = await Answers.destroy({
      where: { id: answerId },
    });
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    return res.json(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  console.log("questionId: ", questionId);
  try {
    const answers = await Answers.findAll({
      where: { questionId },
    });

    return res.json(answers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addQuestion,
  setQuestionText,
  setQuestionOpened,
  uploadImage,
  uploadVideo,
  getQuestions,
  createAnswer,
  deleteAnswer,
  getAnswers,
};
