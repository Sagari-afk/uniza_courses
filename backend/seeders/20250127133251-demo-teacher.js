module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM User WHERE role = "teacher"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("teacher", [
      {
        userId: users[0]?.id,
        institute: "KMIKT",
        office: "BD303",
        phone: "+380671234567",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("teacher", null, {});
  },
};
