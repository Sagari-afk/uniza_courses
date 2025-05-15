"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      Topic.hasMany(models.Subtopic, {
        foreignKey: "topicId",
        onDelete: "CASCADE",
        as: "subtopic",
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
      tableName: "topic",
      modelName: "Topic",
    }
  );
  return Topic;
};
