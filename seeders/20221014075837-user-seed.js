'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: 'BEKEL12211',
          password_hash: await bcrypt.hash("Bekelompok1@", 10),
          ref_code: "EFGH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'kel1',
          password_hash: await bcrypt.hash("Kelompok1#$", 10),
          name: 'Kelompok 1',
          phone_number: "081234567890",
          address: "Jl. Kelompok No. 1",
          ref_code: "ABCD",
          ref_code_friend: "EFGH",
          thumbnail: "https://remax.fi/static/shelter/themes/remax/img/default-news-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
