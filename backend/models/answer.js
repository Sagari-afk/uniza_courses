"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Question, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
    }
  }
  Answer.init(
    {
      questionId: DataTypes.INTEGER,
      contentFileName: DataTypes.STRING,
      correctAnswer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answer",
    }
  );
  return Answer;
};
