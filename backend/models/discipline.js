"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discipline extends Model {
    static associate(models) {
      Discipline.belongsToMany(models.Course, {
        through: "course_discipline",
        foreignKey: "disciplineId",
        as: "courses",
      });
    }
  }
  Discipline.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "discipline",
      modelName: "Discipline",
    }
  );
  return Discipline;
};
