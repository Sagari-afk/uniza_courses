const {
  sequelize,
  Course,
  CourseComment,
  User,
  Discipline,
  Teacher,
  Step,
  Topic,
  Subtopic,
  StudentProgressHistory,
} = require("../models");
const { body, validationResult } = require("express-validator");

const getCourses = async (req, res) => {
  try {
    const records = await Course.findAll({
      include: [
        {
          model: CourseComment,
          include: {
            model: User,
            as: "user",
            attributes: ["firstName", "secondName", "email", "profile_img_url"],
            required: false,
          },
        },
        {
          model: Teacher,
          attributes: ["id", "institute", "office", "phone"],
          through: { attributes: [] },
          as: "teacher",
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
          as: "discipline",
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
          model: CourseComment,
          include: {
            model: User,
            as: "user",
            attributes: ["firstName", "secondName", "email", "profile_img_url"],
            required: false,
          },
        },
        {
          model: Teacher,
          attributes: ["id", "institute", "office", "phone"],
          as: "teacher",
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
          as: "discipline",
        },
        {
          model: Topic,
          attributes: ["title", "order", "id"],
          as: "topic",
          include: [
            {
              model: Subtopic,
              attributes: ["title", "order", "id"],
              as: "subtopic",
              include: [
                {
                  model: Step,
                  attributes: ["title", "order", "id", "type"],
                  as: "step",
                },
              ],
            },
          ],
        },
      ],
      order: [
        [{ model: Topic, as: "topic" }, "order", "ASC"],
        [
          { model: Topic, as: "topic" },
          { model: Subtopic, as: "subtopic" },
          "order",
          "ASC",
        ],
        [
          { model: Topic, as: "topic" },
          { model: Subtopic, as: "subtopic" },
          { model: Step, as: "step" },
          "order",
          "ASC",
        ],
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

const newCourse = [
  body("name").not().isEmpty(),
  body("description").not().isEmpty(),

  async (req, res) => {
    const { name, description, discipline, year, teacher, long_description } =
      req.body;
    const disciplines1 = JSON.parse(discipline);
    const teachers1 = JSON.parse(teacher);

    const img_url = req.file ? req.file.path : null;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessage = errors
        .array()
        .map((item) => `${item.path} - ${item.msg}`)
        .join(",");
      return res.status(400).json(errMessage);
    }

    try {
      const course = await Course.create({
        name,
        img_url,
        description,
        year,
        long_description,
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
      return res.status(500).json(error.message);
    }
  },
];

const updateCourse = async (req, res) => {
  try {
    const data = { ...req.body };
    const existingCourse = await Course.findByPk(req.params.id);
    if (!existingCourse)
      return res.status(400).json("Course s takym id neexistuje!");

    if (data.teacher) {
      let teacherIds = data.teacher;
      if (typeof teacherIds === "string") {
        teacherIds = JSON.parse(teacherIds);
      }
      await existingCourse.setTeachers(teacherIds);
      delete data.teacher;
    }

    if (data.discipline) {
      let disciplineInput = data.discipline;
      if (typeof disciplineInput === "string") {
        disciplineInput = JSON.parse(disciplineInput);
      }
      const disciplineIds = await Promise.all(
        disciplineInput.map(async (disc) => {
          if (Number.isInteger(disc)) return disc;
          const disciplineRecord = await Discipline.findOne({
            where: { name: disc },
          });
          return disciplineRecord ? disciplineRecord.id : null;
        })
      );
      const filteredDisciplineIds = disciplineIds.filter((id) => id !== null);
      await existingCourse.setDisciplines(filteredDisciplineIds);
      delete data.discipline;
    }
    await existingCourse.update(data);
    if (req.file) {
      await existingCourse.update({ img_url: req.file.path });
      console.log("UPDATING IMAGE TO ", req.file.path);
    }

    console.log("success");
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
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

const getAllTeachersCourses = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      where: { userId: req.params.userId },
    });

    const records = await Course.findAll({
      include: [
        {
          model: CourseComment,
          include: {
            model: User,
            as: "user",
            attributes: ["firstName", "secondName", "email", "profile_img_url"],
            required: false,
          },
        },
        {
          model: Teacher,
          attributes: ["id", "institute", "office", "phone"],
          through: { attributes: [] },
          as: "teacher",
          where: { id: teacher.id },
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
          as: "discipline",
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

const getStudentsCount = async (req, res) => {
  try {
    const courseId = req.params.id;
    const count = await StudentProgressHistory.count({
      where: { courseId },
      distinct: true,
      col: "userId",
    });
    console.log("count", count);

    return res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCourses,
  newCourse,
  updateCourse,
  deleteCourse,
  getCourseBy,
  getAllTeachersCourses,
  getStudentsCount,
};
