'use strict';

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
    await queryInterface.bulkInsert('Categories', [{
      title : 'Sayuran hijau',
      thumbnail : 'https://ik.imagekit.io/4jkjrz9tf/Importance-of-Green-Vegetables_D_xEEx2Rj.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1666338047405',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
