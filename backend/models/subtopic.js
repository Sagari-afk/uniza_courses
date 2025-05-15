"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subtopic extends Model {
    static associate(models) {
      Subtopic.belongsTo(models.Topic, {
        foreignKey: "topicId",
        onDelete: "CASCADE",
      });
      Subtopic.hasMany(models.Step, {
        foreignKey: "subtopicId",
        onDelete: "CASCADE",
        as: "step",
      });
    }
  }
  Subtopic.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "subtopic",
      modelName: "Subtopic",
    }
  );
  return Subtopic;
};
