"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTypes extends Model {
    static associate({ User }) {
      UserTypes.hasMany(User, { foreignKey: "type_id", onDelete: "CASCADE" });
    }
  }
  UserTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_type",
      modelName: "UserType",
    }
  );
  return UserTypes;
};
