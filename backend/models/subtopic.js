"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTopic extends Model {
    static associate(models) {
      SubTopic.belongsTo(models.Topic, {
        foreignKey: "topicId",
        onDelete: "CASCADE",
      });
      SubTopic.hasMany(models.Step, {
        foreignKey: "subtopicId",
        onDelete: "CASCADE",
        as: "steps",
      });
    }
  }
  SubTopic.init(
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
      tableName: "subtopics",
      modelName: "SubTopic",
    }
  );
  return SubTopic;
};
