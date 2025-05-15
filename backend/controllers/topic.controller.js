const { sequelize, Topic } = require("../models");
const { body, validationResult } = require("express-validator");

const newTopic = [
  body("title").not().isEmpty(),
  body("courseId").not().isEmpty(),

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

    const { title, courseId } = req.body;
    const order = (await Topic.count({ where: { courseId } })) + 1;

    try {
      const topic = await Topic.create({
        title,
        courseId,
        order,
      });

      return res.json(topic);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const editTopicOrder = [
  body("courseId").not().isEmpty(),
  body("topic").isArray(),

  async (req, res) => {
    console.log("mlem");
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

    try {
      const { courseId, topic } = req.body;
      for (let i = 0; i < topic.length; i++) {
        await Topic.update(
          { order: i + 1 },
          { where: { id: topic[i].topicId, courseId } }
        );
      }
      return res.json({ message: "Topic order updated}" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const editTopic = [
  body("topicId").not().isEmpty(),
  body("title").not().isEmpty(),

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

    const { topicId, title } = req.body;

    try {
      const topic = await Topic.findByPk(topicId);
      topic.title = title;
      await topic.save();

      return res.json(topic);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

const deleteTopic = [
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

    const topicId = req.params.topicId;

    try {
      const topic = await Topic.findByPk(topicId);
      await topic.destroy();

      return res.json({ message: "Topic deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

module.exports = { newTopic, editTopicOrder, editTopic, deleteTopic };
