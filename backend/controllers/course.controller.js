const {
  sequelize,
  Course,
  CourseComments,
  User,
  Discipline,
  Teacher,
} = require("../models");
const { body, validationResult } = require("express-validator");

const getCourses = async (req, res) => {
  try {
    const records = await Course.findAll({
      include: [
        {
          model: CourseComments,
          include: {
            model: User, // Use the actual model reference here
            attributes: ["id", "firstName", "secondName", "role"], // Specify the fields you want to include from User
          },
        },
        {
          model: Teacher,
          attributes: ["id", "institute", "office", "phone"],
          through: { attributes: [] },
          as: "teachers",
          include: [
            {
              model: User,
              attributes: ["firstName", "secondName", "email"],
              as: "user",
              required: false,
            },
          ],
        },
        {
          model: Discipline,
          attributes: ["name"],
          through: { attributes: [] },
          as: "disciplines",
        },
      ],
    });
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
            attributes: ["id", "firstName", "secondName", "role"], // Specify the fields you want to include from User
          },
        },
        {
          model: Teacher,
          attributes: ["id", "institute", "office", "phone"],
          through: { attributes: [] },
          as: "teachers",
          include: [
            {
              model: User,
              attributes: ["firstName", "secondName", "email"],
              as: "user",
              required: false,
            },
          ],
        },
        {
          model: Discipline,
          attributes: ["name"],
          through: { attributes: [] },
          as: "disciplines",
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

    const { name, img_url, description, year, disciplines, teachers } =
      req.body;

    try {
      const course = await Course.create({
        name,
        img_url,
        description,
        year,
      });

      for (const i of teachers) {
        if (Teacher.findByPk(i)) {
          await course.addTeacher(i);
        } else {
          res.status(400).json(`The teacher with id ${i} doesnt exist`);
        }
      }

      for (const i of disciplines) {
        if (Discipline.findByPk(i)) {
          console.log(i);
          await course.addDiscipline(i);
        } else {
          res.status(400).json(`The discipline with id ${i} doesnt exist`);
        }
      }

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
