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

module.exports = { getLastUserProgress, addLastUserProgress };
