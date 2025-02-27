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

module.exports = { newSubTopic };
