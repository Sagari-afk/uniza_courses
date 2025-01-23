"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Student.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      personalNum: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
