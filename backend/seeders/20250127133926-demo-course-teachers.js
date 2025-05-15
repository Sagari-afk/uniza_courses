"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = await queryInterface.sequelize.query(
      "SELECT id FROM course",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const teacher = await queryInterface.sequelize.query(
      "SELECT id FROM teacher",
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("teacher_courses", [
      {
        courseId: courses[0].id,
        teacherId: teacher[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   courseId: courses[1].id,
      //   teacherId: teacher[1].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   courseId: courses[2].id,
      //   teacherId: teacher[1].id,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teacher_courses", null, {});
  },
};
