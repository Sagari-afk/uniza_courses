module.exports = {
  up: async (queryInterface, Sequelize) => {
    const discipline = await queryInterface.sequelize.query(
      "SELECT id FROM Discipline",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const courses = await queryInterface.sequelize.query(
      "SELECT id FROM Course",
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("course_discipline", [
      {
        disciplineId: discipline[0].id,
        courseId: courses[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: discipline[1].id,
        courseId: courses[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: discipline[0].id,
        courseId: courses[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        disciplineId: discipline[1].id,
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
