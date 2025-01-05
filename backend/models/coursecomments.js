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
      });
    }
  }
  CourseComments.init(
    {
      courseId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      commentText: DataTypes.STRING,
      commentRate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseComments",
    }
  );
  return CourseComments;
};
