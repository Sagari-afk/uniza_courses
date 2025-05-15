"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.CourseComment, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
      Course.hasMany(models.Topic, {
        foreignKey: "courseId",
        onDelete: "CASCADE",
        as: "topic",
      });
      Course.belongsToMany(models.Teacher, {
        through: "teacher_courses",
        foreignKey: "courseId",
        as: "teacher",
      });
      Course.belongsToMany(models.Discipline, {
        through: "course_discipline",
        foreignKey: "courseId",
        as: "discipline",
      });
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      long_description: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      sequelize,
      tableName: "course",
      modelName: "Course",
    }
  );
  return Course;
};
