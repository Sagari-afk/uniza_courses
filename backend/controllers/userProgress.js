const {
  StudentProgressHistory,
  User,
  Course,
  Topic,
  SubTopic,
  Step,
} = require("../models");

const getLastUserProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const records = await StudentProgressHistory.findAll({
      where: { userId, courseId },
    });
    return res.status(200).json({ records: records[records.length - 1] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
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
