const { sequelize, SubTopic } = require("../models");
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
    const order = (await SubTopic.count({ where: { topicId } })) + 1;

    try {
      const subtopic = await SubTopic.create({
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
  body("subtopics").not().isEmpty(),

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

    const { subtopics } = req.body;
    try {
      for (let i = 0; i < subtopics.length; i++) {
        await SubTopic.update(
          { order: i + 1 },
          { where: { id: subtopics[i].subtopicId } }
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
      await SubTopic.update({ title }, { where: { id: subtopicId } });
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
      await SubTopic.destroy({ where: { id: subtopicId } });
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
