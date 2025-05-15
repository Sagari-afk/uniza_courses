module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("course_discipline", {
      disciplineId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Discipline",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Course",
          key: "id",
        },
        onDelete: "CASCADE",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course_discipline");
  },
};
