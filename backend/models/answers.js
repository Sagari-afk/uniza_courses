"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      Answers.belongsTo(models.Questions, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
    }
  }
  Answers.init(
    {
      questionId: DataTypes.INTEGER,
      contentFileName: DataTypes.STRING,
      correctAnswer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Answers",
      tableName: "answers",
    }
  );
  return Answers;
};
