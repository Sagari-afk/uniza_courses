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

    try {
      const topic = await Topic.create({
        title,
        courseId,
      });

      return res.json(topic);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

module.exports = { newTopic };
