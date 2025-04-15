"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    static associate(models) {
      // define association here
      Questions.belongsTo(models.Step, {
        foreignKey: "stepId",
        onDelete: "CASCADE",
      });
      Questions.hasMany(models.Answers, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
      // Questions.hasMany(models.UserAnswers, {
      //   foreignKey: "questionId",
      //   onDelete: "CASCADE",
      // });
      // Questions.hasMany(models.UserQuestion, {
      //   foreignKey: "questionId",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Questions.init(
    {
      stepId: { type: DataTypes.INTEGER, allowNull: false },
      opened: { type: DataTypes.BOOLEAN, allowNull: true },
      order: { type: DataTypes.INTEGER, allowNull: false },
      questionFileName: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );
  return Questions;
};
