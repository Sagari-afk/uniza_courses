module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM User WHERE role = "student"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("Students", [
      {
        userId: users[0].id,
        personalNum: "318224",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Students", null, {});
  },
};
