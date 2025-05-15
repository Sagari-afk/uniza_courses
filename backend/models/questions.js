"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Step, {
        foreignKey: "stepId",
        onDelete: "CASCADE",
      });
      Question.hasMany(models.Answer, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
      // Question.hasMany(models.UserAnswers, {
      //   foreignKey: "questionId",
      //   onDelete: "CASCADE",
      // });
      // Question.hasMany(models.UserQuestion, {
      //   foreignKey: "questionId",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Question.init(
    {
      stepId: { type: DataTypes.INTEGER, allowNull: false },
      opened: { type: DataTypes.BOOLEAN, allowNull: true },
      order: { type: DataTypes.INTEGER, allowNull: false },
      // questionFileName: { type: DataTypes.STRING, allowNull: true },
      questionText: { type: DataTypes.TEXT("long"), allowNull: true },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "question",
    }
  );
  return Question;
};
