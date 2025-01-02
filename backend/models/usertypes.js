"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTypes extends Model {
    // static associate({ User }) {
    //   this.hasMany(User, { foreignKey: "type_id" });
    // }
  }
  UserTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
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
