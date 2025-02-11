"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    static associate(models) {
      Step.belongsTo(models.SubTopic, {
        foreignKey: "subtopicId",
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
    },
    {
      sequelize,
      modelName: "Step",
    }
  );
  return Step;
};
