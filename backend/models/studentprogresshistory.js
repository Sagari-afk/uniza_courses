"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentProgressHistory extends Model {
    static associate(models) {
      StudentProgressHistory.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      StudentProgressHistory.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
      });

      StudentProgressHistory.belongsTo(models.Topic, {
        foreignKey: "topicId",
        as: "topic",
      });

      StudentProgressHistory.belongsTo(models.SubTopic, {
        foreignKey: "subtopicId",
        as: "subtopic",
      });

      StudentProgressHistory.belongsTo(models.Step, {
        foreignKey: "stepId",
        as: "step",
      });
    }
  }
  StudentProgressHistory.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      courseId: { type: DataTypes.INTEGER, allowNull: false },
      topicId: { type: DataTypes.INTEGER, allowNull: false },
      subtopicId: { type: DataTypes.INTEGER, allowNull: false },
      stepId: { type: DataTypes.INTEGER, allowNull: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "StudentProgressHistory",
    }
  );
  return StudentProgressHistory;
};
