"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course",
      [
        {
          createdAt: new Date("2024-10-27T09:08:27.000Z"),
          updatedAt: new Date("2024-10-27T09:08:27.000Z"),
          name: "Databazy",
          img_url:
            "https://assets.datamation.com/uploads/2023/06/dm-top-database-challenges-696x457.png",
          year: 3,
          description:
            "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
        },
        {
          createdAt: new Date("2024-10-27T09:08:27.000Z"),
          updatedAt: new Date("2024-10-27T09:08:27.000Z"),
          name: "Weby",
          year: 2,
          img_url:
            "https://miro.medium.com/v2/resize:fit:512/1*GaBtlHe240ZkwlcBrFczgQ.jpeg",
          description:
            "What is a Web Application? A web application is software that runs in your web browser. Businesses have to exchange information and deliver services remotely. They use web applications to connect with customers conveniently and securely.",
        },
        {
          createdAt: new Date("2024-10-27T09:08:27.000Z"),
          updatedAt: new Date("2024-10-27T09:08:27.000Z"),
          name: "Java",
          year: 2,
          img_url: "https://www.oracle.com/img/tech/cb88-java-logo-001.jpg",
          description:
            "Java is a popular programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more. Start learning Java now.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("course", null, {});
  },
};
