const { sequelize, Subtopic } = require("../models");
const { body, validationResult } = require("express-validator");

const newSubTopic = [
  body("title").not().isEmpty(),
  body("topicId").not().isEmpty(),

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

    const { title, topicId } = req.body;
    const order = (await Subtopic.count({ where: { topicId } })) + 1;

    try {
      const subtopic = await Subtopic.create({
        title,
        topicId,
        order,
      });

      return res.json(subtopic);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const editSubtopicOrder = [
  body("subtopic").not().isEmpty(),

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

    const { subtopic } = req.body;
    try {
      for (let i = 0; i < subtopic.length; i++) {
        await Subtopic.update(
          { order: i + 1 },
          { where: { id: subtopic[i].subtopicId } }
        );
      }
      return res.json("Subtopic order updated");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const editSubtopic = [
  body("subtopicId").not().isEmpty(),
  body("title").not().isEmpty(),

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

    const { subtopicId, title } = req.body;
    try {
      await Subtopic.update({ title }, { where: { id: subtopicId } });
      return res.json("Subtopic updated");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const deleteSubtopic = [
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

    const subtopicId = req.params.subtopicId;
    try {
      await Subtopic.destroy({ where: { id: subtopicId } });
      return res.json("Subtopic deleted");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

module.exports = {
  newSubTopic,
  editSubtopicOrder,
  editSubtopic,
  deleteSubtopic,
};
