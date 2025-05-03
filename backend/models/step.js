"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    static associate(models) {
      Step.belongsTo(models.SubTopic, {
        foreignKey: "subtopicId",
        onDelete: "CASCADE",
      });
      Step.hasMany(models.Questions, {
        as: "questions",
        onDelete: "CASCADE",
      });
    }
  }
  Step.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subtopicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // fileName: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(
          "text",
          "test",
          "video",
          "audio",
          "document",
          "presentation"
        ),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Step",
    }
  );
  return Step;
};
