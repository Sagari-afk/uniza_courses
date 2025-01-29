module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("User", [
      {
        firstName: "Иван",
        secondName: "Иванов",
        email: "ivanov@example.com",
        role: "teacher",
        password: "+jiwnIj1234",
        salt: "",
        profile_img_url:
          "https://steamuserimages-a.akamaihd.net/ugc/2487752471242962466/B0AD5BD977EA66858ABD15A472F1B5180B780D11/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Мария",
        secondName: "Петрова",
        email: "petrova@example.com",
        role: "teacher",
        password: "+jiwnIj1234",
        salt: "",
        profile_img_url:
          "https://steamuserimages-a.akamaihd.net/ugc/2487752471242962466/B0AD5BD977EA66858ABD15A472F1B5180B780D11/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Петр",
        secondName: "Петров",
        email: "petrov@example.com",
        role: "student",
        password: "+jiwnIj1234",
        salt: "",
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
