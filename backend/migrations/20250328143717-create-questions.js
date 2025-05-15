"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("question", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stepId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Step",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      opened: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // questionFileName: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      questionText: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
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
    await queryInterface.dropTable("question");
  },
};
