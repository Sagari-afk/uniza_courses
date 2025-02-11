"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      Topic.hasMany(models.SubTopic, {
        foreignKey: "topicId",
        onDelete: "CASCADE",
        as: "subtopics",
      });
    }
  }
  Topic.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
