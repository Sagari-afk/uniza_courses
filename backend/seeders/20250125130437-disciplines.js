"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("disciplines", [
      {
        name: "Multimediálne technológie",
        createdAt: new Date("2024-10-27T09:08:27.000Z"),
        updatedAt: new Date("2024-10-27T09:08:27.000Z"),
      },
      {
        name: "Komunikačné a informačné technológie",
        createdAt: new Date("2024-10-27T09:08:27.000Z"),
        updatedAt: new Date("2024-10-27T09:08:27.000Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("disciplines", null, {});
  },
};
