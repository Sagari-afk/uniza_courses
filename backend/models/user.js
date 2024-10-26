'use strict';
const {
  Model
} = require('sequelize');
const usertypes = require('./usertypes');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ UserType }) {
      this.belongsTo(UserType, { foreignKey: 'type_id' })
    }

    static checkPassword(user, password) {
      const hash_pwd = crypto.pbkdf2Sync(user.password, user.salt, 100, 64, 'sha512').toString('hex');
      return password === hash_pwd;
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
      unique: true,
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
    hooks: {
      beforeCreate: (user, options) => {
        const salt = crypto.randomBytes(16).toString('hex');
        console.log(salt, user.password);
        user.salt = salt;
        user.password = crypto.pbkdf2Sync(user.password, salt, 100, 64, 'sha512').toString('hex');
      },
    },
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};