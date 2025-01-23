"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate = function (models) {
      User.hasMany(models.CourseComments, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });

      User.hasOne(models.Teacher, {
        foreignKey: "userId",
        as: "teacher",
      });

      User.hasOne(models.Student, {
        foreignKey: "userId",
        as: "student",
      });
    };

    static checkPassword(user, password) {
      const hash_pwd = crypto
        .pbkdf2Sync(user.password, user.salt, 100, 64, "sha512")
        .toString("hex");
      return password === hash_pwd;
    }

    toJSON() {
      return { ...this.get(), salt: undefined, password: undefined };
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondName: {
        type: DataTypes.STRING,
        allowNull: false,
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
      salt: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("teacher", "student"),
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if (user.isNewRecord) {
            // Check if it's a new record
            const salt = crypto.randomBytes(16).toString("hex");
            console.log(salt, user.password);
            user.salt = salt;
            user.password = crypto
              .pbkdf2Sync(user.password, salt, 100, 64, "sha512")
              .toString("hex");
          }
        },
      },
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );
  return User;
};
