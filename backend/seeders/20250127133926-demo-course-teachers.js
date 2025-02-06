"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = await queryInterface.sequelize.query(
      "SELECT id FROM Course",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const teachers = await queryInterface.sequelize.query(
      "SELECT id FROM Teachers",
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("teacher_courses", [
      {
        courseId: courses[0].id,
        teacherId: teachers[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: courses[1].id,
        teacherId: teachers[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: courses[2].id,
        teacherId: teachers[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teacher_courses", null, {});
  },
};
