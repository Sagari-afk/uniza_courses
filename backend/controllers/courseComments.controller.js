const { sequelize, CourseComments } = require("../models");
const { body, validationResult } = require("express-validator");

const newComment = [
  body("comment").not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      res.status(400).json(errMessage);
    }

    const { comment } = req.body;

    try {
      const courseComment = await CourseComment.create({});

      return res.json(course);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
];

module.exports = {};
