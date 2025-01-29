// миграция для создания таблицы teacher_courses
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("teacher_courses", {
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teachers",
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
    await queryInterface.dropTable("teacher_courses");
  },
};
