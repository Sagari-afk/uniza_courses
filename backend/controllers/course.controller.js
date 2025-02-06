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
            model: User,
            attributes: [
              "id",
              "firstName",
              "secondName",
              "role",
              "profile_img_url",
            ],
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
              attributes: [
                "firstName",
                "secondName",
                "email",
                "profile_img_url",
              ],
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

    const courses = records.map((record) => {
      const course = record.toJSON();

      if (course.img_url) {
        course.img_url = `${req.protocol}://${req.get("host")}/${
          course.img_url
        }`;
      }
      return course;
    });

    return res.status(200).json({ records: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCourseBy = async (req, res) => {
  try {
    const record = await Course.findByPk(req.params.id, {
      include: [
        {
          model: CourseComments,
          include: {
            model: User,
            attributes: [
              "id",
              "firstName",
              "secondName",
              "role",
              "profile_img_url",
            ],
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
              attributes: [
                "firstName",
                "secondName",
                "email",
                "profile_img_url",
              ],
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

    if (!record) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = record.toJSON();
    if (course.img_url) {
      course.img_url = `${req.protocol}://${req.get("host")}/${course.img_url}`;
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCourses, getCourseBy };

const newCourse = [
  body("name").not().isEmpty(),
  body("description").not().isEmpty(),

  async (req, res) => {
    const { name, description, disciplines, year, teachers } = req.body;
    const disciplines1 = JSON.parse(disciplines);
    const teachers1 = JSON.parse(teachers);

    const img_url = req.file ? req.file.path : null;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      res.status(400).json(errMessage);
    }

    try {
      const course = await Course.create({
        name,
        img_url,
        description,
        year,
      });

      for (const i of teachers1) {
        if (await Teacher.findByPk(i)) {
          await course.addTeacher(i);
        } else {
          console.log("npt mlem");
          return res.status(400).json(`The teacher with id ${i} doesnt exist`);
        }
      }

      for (const i of disciplines1) {
        const id = await Discipline.findOne({
          where: { name: i },
        });
        console.log("id", id);

        if (id) {
          await course.addDiscipline(id);
        } else {
          return res
            .status(400)
            .json(`The discipline with id ${id} doesnt exist`);
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
