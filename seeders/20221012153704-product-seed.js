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
          title: 'Kol',
          category_id: 2,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Kol',
          category_id: 2,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Wortel',
          category_id: 2,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Kangkung',
          category_id: 2,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Apel',
          category_id: 1,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Nanas',
          category_id: 1,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pepaya',
          category_id: 1,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Durian',
          category_id: 1,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Semangka',
          category_id: 1,
          price: 2000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 500 kg',
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
