"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsToMany(models.Course, { through: "Teacher_Courses" });

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
      modelName: "Teacher",
    }
  );
  return Teacher;
};
