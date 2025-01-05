const { sequelize, Course, CourseComments, User } = require("../models");
const { body, validationResult } = require("express-validator");

const getCourses = async (req, res) => {
  try {
    const records = await Course.findAll();
    return res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getCourseBy = async (req, res) => {
  try {
    const records = await Course.findByPk(req.params.id, {
      include: [
        {
          model: CourseComments,
          include: {
            model: User, // Use the actual model reference here
            attributes: ["id", "name"], // Specify the fields you want to include from User
          },
        },
      ],
    });

    return res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const newCourse = [
  body("name").not().isEmpty(),
  body("img_url").not().isEmpty().isURL(),
  body("description").not().isEmpty(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      res.status(400).json(errMessage);
    }

    const { name, img_url, description } = req.body;

    try {
      const course = await Course.create({
        name,
        img_url,
        description,
      });

      return res.json(course);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
];

const updateCourse = async (req, res) => {
  try {
    let data = req.body;
    const existingCourse = await Course.findByPk(req.params.id);
    if (!existingCourse)
      return res.status(400).json("Course s takym id neexistuje!");
    for (const [key, value] of Object.entries(data)) {
      await Course.update(
        { [key]: value },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const existingCourse = await Course.findByPk(req.params.id);
    if (!existingCourse)
      return res.status(400).json("Course s takym id neexistuje!");
    await Course.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  getCourses,
  newCourse,
  updateCourse,
  deleteCourse,
  getCourseBy,
};
