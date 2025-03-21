const { Op } = require("sequelize");
const {
  StudentProgressHistory,
  User,
  Course,
  Topic,
  SubTopic,
  Step,
} = require("../models");

const startCourse = async (userId, courseId) => {
  // user validation
  const user = await User.findByPk(userId);
  if (!user) {
    return;
  }
  // course validation
  const course = await Course.findByPk(courseId);
  if (!course) {
    return;
  }
  const topic = await Topic.findOne({ where: { courseId, order: 1 } });
  if (!topic) return;
  const subtopic = await SubTopic.findOne({
    where: { topicId: topic.id, order: 1 },
  });
  if (!subtopic) return;
  const step = await Step.findOne({
    where: { subtopicId: subtopic.id, order: 1 },
  });
  if (!step) return;

  const record = await StudentProgressHistory.create({
    userId,
    courseId,
    topicId: topic.id,
    subtopicId: subtopic.id,
    stepId: step.id,
  });
  return record;
};

const getLastUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const records = await StudentProgressHistory.findAll({
      where: { userId, courseId },
    });

    if (!records || records.length == 0) {
      const record = await startCourse(userId, courseId);
      console.log("Record: ", record);
      if (!record || record.length == 0) return res.status(500).json("Error");
      return res.status(200).json({ records: { stepCount: 1, ...record } });
    }

    const stepsCount = await StudentProgressHistory.count({
      where: { userId, courseId },
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
    const subtopic = await SubTopic.findByPk(subtopicId);
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
    stepFromHistory.completed = true;
    await stepFromHistory.save();
    return res.status(200).json({ message: true });
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
    const subtopic = await SubTopic.findByPk(subtopicId);
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
      // if (!nextStepInSubtopic) {
      //   return res.status(400).json({ error: "Next step not found" });
      // }
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
    // Find all subtopics in the same topic with an order greater than the current subtopic.
    const nextSubtopics = await SubTopic.findAll({
      where: {
        topicId,
        order: { [Op.gt]: subtopic.order },
      },
      order: [["order", "ASC"]],
    });

    let nextSubtopicWithSteps = null;
    let firstStepNextSubtopic = null;
    // Loop through candidate subtopics until we find one that has at least one step.
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
      return res.status(200).json({ message: "No further steps available." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getLastUserProgress,
  addLastUserProgress,
  setStepCompleted,
  nextStep,
};
