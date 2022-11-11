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
          price: 6000,
          stock: 5,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 1 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Belimbing',
          category_id: 1,
          price: 15000,
          stock: 2,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah belimbing setara 90 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/belimbing_eKQI4HXnC.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Wortel',
          category_id: 2,
          price: 6000,
          stock: 12,
          qty_unit: 500,
          unit_id: 3,
          promo: 2,
          max_promo: 3,
          info: '1 buah wortel setara 100 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/wortel_JeEMob6Dg.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Kangkung',
          category_id: 2,
          price: 3000,
          stock: 5,
          qty_unit: 1,
          unit_id: 1,
          promo: 2,
          max_promo: 3,
          info: '1 ikat kangkung setara 250 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kangkung_8Zo-Lsqh_.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Apel',
          category_id: 1,
          price: 29000,
          stock: 6,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah apel setara 200 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/apel_EHvAlg9np.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Nanas',
          category_id: 1,
          price: 12900,
          stock: 18,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah nanas setara 550 g',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/nanas_04J5I7ASd.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pepaya',
          category_id: 1,
          price: 15000,
          stock: 15,
          qty_unit: 1,
          unit_id: 2,
          promo: 2,
          max_promo: 3,
          info: '1 buah pepaya setara 1,2 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/pepaya_Ad-mWqvaD.jpg',
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
