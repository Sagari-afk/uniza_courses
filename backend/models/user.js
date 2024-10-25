'use strict';
const {
  Model
} = require('sequelize');
const usertypes = require('./usertypes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ UserType }) {
      this.belongsTo(UserType, { foreignKey: 'type_id' })
    }
  }
  User.init({
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personal_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};