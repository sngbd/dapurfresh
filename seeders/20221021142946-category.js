'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
      'Categories',
      [
        {
          title: 'Buah',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/Buah-buah-an_ouZnn5ocs.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1666605048298',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Bumbu',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/5-merek-bumbu-masak-ini-ternyata-buatan-anak-indonesia-DtuqK7iJWY_owJybDstFJ.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1666605187611',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Sayur dan Kacang',
          thumbnail: 'https://ik.imagekit.io/4jkjrz9tf/Importance-of-Green-Vegetables_D_xEEx2Rj.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1666338047405',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Sembako',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/ee6ccad1dc03860daa67e4c413f9b683_omW_i-bwIo.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1666605188514',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Lauk Olahan',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kenyangmakan-20200830-104650-0-67eb4c84104311f114e7e38a2edf1147_600x400_yCQUGvJh4E.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1666605187383',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Ikan',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/5d3a73e2e11e9_I4vSfPLfue.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1666605187433',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
