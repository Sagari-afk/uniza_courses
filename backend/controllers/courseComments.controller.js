const { sequelize, CourseComment } = require("../models");
const { body, validationResult } = require("express-validator");

const newComment = [
  body("commentText").not().isEmpty(),
  body("commentRate").not().isEmpty(),
  body("courseId").not().isEmpty(),

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

    const { commentText, commentRate, courseId } = req.body;

    try {
      const courseComment = await CourseComment.create({
        commentText,
        commentRate,
        courseId,
        userId: res.user.userId,
      });

      return res.json(courseComment);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
];

module.exports = { newComment };
