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
      'Products',
      [
        {
          category_id: 1,
          price: 'Rp. 20.000',
          stock: 5,
          unit: '1x buah',
          promo: '10 %',
          max_promo: 'beli 3',
          info: 'Kul segar',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
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
