const { Op, fn, col } = require("sequelize");
const {
  StudentProgressHistory,
  User,
  Course,
  Topic,
  Subtopic,
  Step,
  CourseComment,
  Teacher,
  Discipline,
} = require("../models");

const startCourse = async (userId, courseId) => {
  // user validation
  const user = await User.findByPk(userId);
  if (!user) {
    return "No user with this PK found";
  }
  // course validation
  const course = await Course.findByPk(courseId);
  if (!course) {
    return "No course with this PK found";
  }
  const topic = await Topic.findOne({ where: { courseId, order: 1 } });
  if (!topic) return "No topic found";
  const subtopic = await Subtopic.findOne({
    where: { topicId: topic.id, order: 1 },
  });
  if (!subtopic) return "No subtopic found";
  const step = await Step.findOne({
    where: { subtopicId: subtopic.id, order: 1 },
  });
  if (!step) return "No step found";

  const record = await StudentProgressHistory.create({
    userId,
    courseId,
    topicId: topic.id,
    subtopicId: subtopic.id,
    stepId: step.id,
  });
  console.log("Record in start course: ", record);
  return record;
};

const getLastUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    let records = await StudentProgressHistory.findAll({
      where: { userId, courseId, completed: true },
    });
    if (!records || records.length == 0) {
      records = await StudentProgressHistory.findAll({
        where: { userId, courseId },
      });
    }

    if (!records || records.length == 0) {
      const record = await startCourse(userId, courseId);
      if (typeof record == "string") {
        res.statusMessage = record;
        return res.status(400);
      }
      console.log("Record: ", record);
      return res.status(200).json({ records: { stepsCount: 0, ...record } });
    }

    const stepsCount = await StudentProgressHistory.count({
      where: { userId, courseId, completed: true },
    });
    return res
      .status(200)
      .json({ records: { stepsCount, ...records[records.length - 1] } });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const addLastUserProgress = async (req, res) => {
  try {
    const { userId, courseId, topicId, subtopicId, stepId } = req.body;

    // user validation
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // course validation
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // topic validation
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    if (topic.courseId !== courseId) {
      return res
        .status(400)
        .json({ error: "Topic does not belong to the specified course" });
    }
    // subtopic validation
    const subtopic = await Subtopic.findByPk(subtopicId);
    if (!subtopic) {
      return res.status(404).json({ error: "Subtopic not found" });
    }
    if (subtopic.topicId !== topicId) {
      return res
        .status(400)
        .json({ error: "Subtopic does not belong to the specified topic" });
    }
    // step validation
    const step = await Step.findByPk(stepId);
    if (!step) {
      return res.status(404).json({ error: "Step not found" });
    }
    if (step.subtopicId !== subtopicId) {
      return res
        .status(400)
        .json({ error: "Step does not belong to the specified subtopic" });
    }

    const record = await StudentProgressHistory.create({
      userId,
      courseId,
      topicId,
      subtopicId,
      stepId,
    });
    return res.status(200).json({ records: record });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const setStepCompleted = async (req, res) => {
  try {
    const stepFromHistory = await StudentProgressHistory.findOne({
      where: { stepId: req.params.stepId, userId: req.params.userId },
    });
    console.log("Step from history: ", stepFromHistory);
    stepFromHistory.completed = true;
    await stepFromHistory.save();
    const stepsCount = await StudentProgressHistory.count({
      where: {
        userId: req.params.userId,
        courseId: stepFromHistory.courseId,
        completed: true,
      },
    });
    return res.status(200).json({ message: true, stepsCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const nextStep = async (req, res) => {
  try {
    const { userId, courseId, topicId, subtopicId, stepId } = req.body;
    console.log("Data: ", userId, courseId, topicId, subtopicId, stepId);

    // user validation
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // course validation
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // topic validation
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    if (topic.courseId !== courseId) {
      return res
        .status(400)
        .json({ error: "Topic does not belong to the specified course" });
    }
    // subtopic validation
    const subtopic = await Subtopic.findByPk(subtopicId);
    if (!subtopic) {
      return res.status(404).json({ error: "Subtopic not found" });
    }
    if (subtopic.topicId !== topicId) {
      return res
        .status(400)
        .json({ error: "Subtopic does not belong to the specified topic" });
    }
    // step validation
    const step = await Step.findByPk(stepId);
    if (!step) {
      return res.status(404).json({ error: "Step not found" });
    }
    if (step.subtopicId !== subtopicId) {
      return res
        .status(400)
        .json({ error: "Step does not belong to the specified subtopic" });
    }

    // Find the last step in this subtopic (based on the order field)
    const lastStepInSubtopic = await Step.findOne({
      where: { subtopicId },
      order: [["order", "DESC"]],
    });
    console.log("Last step in subtopic: ", lastStepInSubtopic.dataValues.id);
    // Ak v podteme este su kroky:
    if (lastStepInSubtopic.dataValues.id !== stepId) {
      const nextStepInSubtopic = await Step.findOne({
        where: { subtopicId, order: step.order + 1 },
      });
      // console.log("Next step in subtopic: ", nextStepInSubtopic);
      if (!nextStepInSubtopic) {
        return res.status(404).json({ error: "Next step not found" });
      }
      const record = await StudentProgressHistory.create({
        userId,
        courseId,
        topicId,
        subtopicId,
        stepId: nextStepInSubtopic.id,
      });
      return res.status(200).json({ record, nextStep: nextStepInSubtopic });
    }
    // Current step is the last step in the current subtopic.
    // Find all subtopic in the same topic with an order greater than the current subtopic.
    const nextSubtopics = await Subtopic.findAll({
      where: {
        topicId,
        order: { [Op.gt]: subtopic.order },
      },
      order: [["order", "ASC"]],
    });

    let nextSubtopicWithSteps = null;
    let firstStepNextSubtopic = null;
    // Loop through candidate subtopic until we find one that has at least one step.
    for (const candidateSubtopic of nextSubtopics) {
      const candidateStep = await Step.findOne({
        where: { subtopicId: candidateSubtopic.id },
        order: [["order", "ASC"]],
      });
      if (candidateStep) {
        nextSubtopicWithSteps = candidateSubtopic;
        firstStepNextSubtopic = candidateStep;
        break;
      }
    }
    console.log(nextSubtopicWithSteps, firstStepNextSubtopic);

    if (nextSubtopicWithSteps && firstStepNextSubtopic) {
      const record = await StudentProgressHistory.create({
        userId,
        courseId,
        topicId: nextSubtopicWithSteps.topicId,
        subtopicId: nextSubtopicWithSteps.id,
        stepId: firstStepNextSubtopic.id,
      });
      return res.status(200).json({ record, nextStep: firstStepNextSubtopic });
    } else {
      return res.status(200).json({ message: "No further step available." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const changeSubtopic = async (req, res) => {
  try {
    const { userId, courseId, subtopicId } = req.body;
    console.log("HEH", userId, courseId, subtopicId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const subtopic = await Subtopic.findByPk(subtopicId);
    if (!subtopic) {
      return res.status(404).json({ error: "Subtopic not found" });
    }

    const topic = await Topic.findByPk(subtopic.topicId);
    if (!topic || topic.courseId !== courseId) {
      return res.status(404).json({
        error: "Subtopic does not belong to the specified course",
      });
    }
    const firstStepInSubtopic = await Step.findOne({
      where: { subtopicId },
      order: [["order", "ASC"]],
    });
    if (!firstStepInSubtopic) {
      return res.status(404).json({
        error: "The subtopic does't have any step",
      });
    }
    const progressRecord = await StudentProgressHistory.findOne({
      where: {
        userId,
        courseId,
        topicId: topic.id,
        subtopicId,
        completed: true,
        stepId: firstStepInSubtopic.id,
      },
    });
    const stepsCount = await StudentProgressHistory.count({
      where: {
        userId: userId,
        courseId: courseId,
        completed: true,
      },
    });

    if (!progressRecord) {
      const progressRecord = await StudentProgressHistory.create({
        userId,
        courseId,
        topicId: topic.id,
        subtopicId,
        completed: false,
        stepId: firstStepInSubtopic.id,
      });
      console.log(
        "Progress record (and the step was not complited): ",
        progressRecord
      );
      return res.status(200).json({
        message: "Subtopic changed successfully",
        progress: { stepsCount, ...progressRecord },
      });
    }

    console.log("Progress record: ", progressRecord);
    return res.status(200).json({
      message: "Subtopic changed successfully",
      progress: { stepsCount, ...progressRecord },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getCompletedStatus = async (req, res) => {
  try {
    const stepId = req.params.stepId;
    const userId = req.params.userId;
    const completed = await StudentProgressHistory.findOne({
      where: { stepId, userId, completed: true },
    });
    console.log("Completed: ", completed);
    if (!completed || completed.length == 0)
      return res.status(200).json({ completed: false });

    return res.status(200).json({ completed: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getIsStarted = async (req, res) => {
  try {
    const record = await StudentProgressHistory.findOne({
      where: {
        courseId: req.params.courseId,
        userId: req.params.userId,
      },
    });
    console.log("Is started: ", record);
    if (record) return res.status(200).json({ started: true });
    return res.status(200).json({ started: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const submitTestResults = async (req, res) => {
  try {
    const { userId, testId, results, score } = req.body;
    console.log("Results: ", results);
    const records = await StudentProgressHistory.findAll({
      where: { userId, stepId: testId },
    });
    const record = records[records.length - 1];
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    record.score = score;
    await record.save();
    console.log("Record: ", record);
    return res.status(200).json({ message: "Test results saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getTestResults = async (req, res) => {
  try {
    const { userId, stepId } = req.params;
    const records = await StudentProgressHistory.findAll({
      where: { userId, stepId, score: { [Op.gt]: 0 } },
    });
    const record = records[records.length - 1];
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ results: record.dataValues.score });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// const getCoursesInProgress = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const rows = await StudentProgressHistory.findAll({
//       where: { userId, completed: false },
//       attributes: [[fn("DISTINCT", col("courseId")), "courseId"]],
//       raw: true,
//     });
//     const courseIds = rows.map((r) => r.courseId);

//     const records = await Course.findAll({
//       where: { id: { [Op.in]: courseIds } },
//       include: [
//         {
//           model: CourseComment,
//           include: {
//             model: User,
//             as: "user",
//             attributes: ["firstName", "secondName", "email", "profile_img_url"],
//             required: false,
//           },
//         },
//         {
//           model: Teacher,
//           attributes: ["id", "institute", "office", "phone"],
//           through: { attributes: [] },
//           as: "teacher",
//           include: [
//             {
//               model: User,
//               attributes: [
//                 "firstName",
//                 "secondName",
//                 "email",
//                 "profile_img_url",
//               ],
//               as: "user",
//               required: false,
//             },
//           ],
//         },
//         {
//           model: Discipline,
//           attributes: ["name"],
//           through: { attributes: [] },
//           as: "discipline",
//         },
//       ],
//     });

//     const courses = records.map((record) => {
//       const course = record.toJSON();

//       if (course.img_url) {
//         course.img_url = `${req.protocol}://${req.get("host")}/${
//           course.img_url
//         }`;
//       }
//       return course;
//     });

//     return res.status(200).json({ courses });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error.message);
//   }
// };

async function countStepsInCourse(courseId) {
  const topic = await Topic.findAll({
    where: { courseId },
    attributes: ["id"],
    raw: true,
  });
  const topicIds = topic.map((t) => t.id);

  const subtopic = await Subtopic.findAll({
    where: { topicId: { [Op.in]: topicIds } },
    attributes: ["id"],
    raw: true,
  });
  const subtopicIds = subtopic.map((s) => s.id);

  const totalSteps = await Step.count({
    where: { subtopicId: { [Op.in]: subtopicIds } },
  });

  return totalSteps;
}

const getCoursesInProgress = async (req, res) => {
  try {
    const userId = +req.params.userId;

    const started = await StudentProgressHistory.findAll({
      where: { userId },
      attributes: [[fn("DISTINCT", col("courseId")), "courseId"]],
      raw: true,
    });
    const courseIds = started.map((r) => r.courseId);

    const inProgressCourseIds = [];
    await Promise.all(
      courseIds.map(async (courseId) => {
        const totalSteps = await countStepsInCourse(courseId);
        const completedSteps = await StudentProgressHistory.count({
          where: { userId, courseId, completed: true },
        });

        if (completedSteps > 0 && completedSteps < totalSteps) {
          inProgressCourseIds.push(courseId);
        }
      })
    );

    if (!inProgressCourseIds.length) {
      return res.json({ courses: [] });
    }

    const records = await Course.findAll({
      where: { id: { [Op.in]: inProgressCourseIds } },
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

    const courses = records.map((r) => {
      const c = r.toJSON();
      if (c.img_url) {
        c.img_url = `${req.protocol}://${req.get("host")}/${c.img_url}`;
      }
      return c;
    });

    return res.json({ courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getCompletedCourses = async (req, res) => {
  try {
    const userId = +req.params.userId;

    const rows = await StudentProgressHistory.findAll({
      where: { userId },
      attributes: [
        [
          StudentProgressHistory.sequelize.fn(
            "DISTINCT",
            StudentProgressHistory.sequelize.col("courseId")
          ),
          "courseId",
        ],
      ],
      raw: true,
    });
    const courseIds = rows.map((r) => r.courseId);

    const completedCourseIds = [];
    await Promise.all(
      courseIds.map(async (courseId) => {
        const totalSteps = await countStepsInCourse(courseId);
        const completedSteps = await StudentProgressHistory.count({
          where: { userId, courseId, completed: true },
        });
        if (totalSteps > 0 && completedSteps === totalSteps) {
          completedCourseIds.push(courseId);
        }
      })
    );

    if (completedCourseIds.length === 0) {
      return res.json({ courses: [] });
    }

    const records = await Course.findAll({
      where: { id: { [Op.in]: completedCourseIds } },
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
              as: "user",
              attributes: [
                "firstName",
                "secondName",
                "email",
                "profile_img_url",
              ],
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

    const courses = records.map((r) => {
      const c = r.toJSON();
      if (c.img_url) {
        c.img_url = `${req.protocol}://${req.get("host")}/${c.img_url}`;
      }
      return c;
    });

    return res.json({ courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getLastUserProgress,
  addLastUserProgress,
  setStepCompleted,
  nextStep,
  changeSubtopic,
  getCompletedStatus,
  getIsStarted,
  submitTestResults,
  getTestResults,
  getCoursesInProgress,
  getCompletedCourses,
};
