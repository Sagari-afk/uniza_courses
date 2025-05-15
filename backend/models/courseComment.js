"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseComment extends Model {
    static associate(models) {
      CourseComment.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      CourseComment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user",
      });
    }
  }
  CourseComment.init(
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseComment",
      tableName: "courseComment",
    }
  );
  return CourseComment;
};
