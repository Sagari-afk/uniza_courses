"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseComments extends Model {
    static associate(models) {
      CourseComments.belongsTo(models.Course, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      CourseComments.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user",
      });
    }
  }
  CourseComments.init(
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
      modelName: "CourseComments",
    }
  );
  return CourseComments;
};
