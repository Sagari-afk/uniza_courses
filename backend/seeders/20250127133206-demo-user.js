const crypto = require("crypto");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = crypto.randomBytes(16).toString("hex");

    await queryInterface.bulkInsert("User", [
      {
        firstName: "Ivan",
        secondName: "Ivanov",
        email: "ivanov@example.com",
        role: "teacher",
        salt: salt,
        password: crypto
          .pbkdf2Sync("+jiwnIj1234", salt, 100, 64, "sha512")
          .toString("hex"),
        profile_img_url:
          "https://steamuserimages-a.akamaihd.net/ugc/2487752471242962466/B0AD5BD977EA66858ABD15A472F1B5180B780D11/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Maria",
        secondName: "Petrova",
        email: "petrova@example.com",
        role: "teacher",
        salt: salt,
        password: crypto
          .pbkdf2Sync("+jiwnIj1234", salt, 100, 64, "sha512")
          .toString("hex"),
        profile_img_url:
          "https://steamuserimages-a.akamaihd.net/ugc/2487752471242962466/B0AD5BD977EA66858ABD15A472F1B5180B780D11/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Peter",
        secondName: "Petrov",
        email: "petrov@example.com",
        role: "student",
        salt: salt,
        password: crypto
          .pbkdf2Sync("+jiwnIj1234", salt, 100, 64, "sha512")
          .toString("hex"),
        profile_img_url:
          "https://steamuserimages-a.akamaihd.net/ugc/2487752471242962466/B0AD5BD977EA66858ABD15A472F1B5180B780D11/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};
