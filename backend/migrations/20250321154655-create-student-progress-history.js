"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studentProgressHistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      topicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subtopicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stepId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("studentProgressHistory");
  },
};
