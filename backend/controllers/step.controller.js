const { sequelize, Step } = require("../models");
const { body, validationResult } = require("express-validator");

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

module.exports = { newStep };
