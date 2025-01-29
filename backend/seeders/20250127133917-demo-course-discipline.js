module.exports = {
  up: async (queryInterface, Sequelize) => {
    const disciplines = await queryInterface.sequelize.query(
      "SELECT id FROM Disciplines",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const courses = await queryInterface.sequelize.query(
      "SELECT id FROM Course",
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("course_discipline", [
      {
        disciplineId: disciplines[0].id,
        courseId: courses[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: disciplines[1].id,
        courseId: courses[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: disciplines[0].id,
        courseId: courses[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: disciplines[1].id,
        courseId: courses[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("course_discipline", null, {});
  },
};
