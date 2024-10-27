'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      name: 'John Doe',
      email: 'jondoe@stud.uniza.sk',
      type_id: 1,
      personal_num: 233333,
      institute: "KMIKT",
      password: '12345',
      createdAt: new Date("2024-10-27T09:08:27.000Z"),
      updatedAt: new Date("2024-10-27T09:08:27.000Z")
    },
    {
      name: 'Alisa Vasylieva',
      email: 'vasylieva@stud.uniza.sk',
      type_id: 1,
      personal_num: 222000,
      institute: "KMIKT",
      password: 'sdfdsfcvsew',
      createdAt: new Date("2024-10-27T09:08:27.000Z"),
      updatedAt: new Date("2024-10-27T09:08:27.000Z")
    },
    {
      name: 'Alina Ticha',
      email: 'ticha@stud.uniza.sk',
      type_id: 2,
      personal_num: 229992,
      institute: "KMIKT",
      password: 'dfwetjgdfe',
      createdAt: new Date("2024-10-27T09:08:27.000Z"),
      updatedAt: new Date("2024-10-27T09:08:27.000Z")
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
