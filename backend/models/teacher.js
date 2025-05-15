"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsToMany(models.Course, {
        through: "teacher_courses",
        foreignKey: "teacherId",
        as: "courses",
      });

      Teacher.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Teacher.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      institute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      office: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "teacher",
      modelName: "Teacher",
    }
  );
  return Teacher;
};
