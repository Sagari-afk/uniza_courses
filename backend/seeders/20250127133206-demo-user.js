const crypto = require("crypto");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = crypto.randomBytes(16).toString("hex");

    await queryInterface.bulkInsert("user", [
      {
        firstName: "Maria",
        secondName: "Petrova",
        email: "petrova@example.com",
        role: "teacher",
        salt: salt,
        password: crypto
          .pbkdf2Sync(process.env.USER_PASSWORD, salt, 100, 64, "sha512")
          .toString("hex"),
        profile_img_url:
          "https://i.pinimg.com/736x/98/a3/4b/98a34b7bf1a5318ac051122e97aafb01.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
