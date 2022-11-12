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
          id: 1,
          title: 'Kol',
          category_id: 2,
          price: 6000,
          stock: 85,
          unit: '1 kg',
          promo: 2,
          max_promo: 3,
          info: '1 buah kol setara 1 kg',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kul_IboP2NDGW.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Belimbing',
          category_id: 1,
          price: 15000,
          stock: 73,
          unit: '90 gr',
          promo: 2,
          max_promo: 3,
          info: '1 buah belimbing setara 90 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/belimbing_eKQI4HXnC.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'Wortel',
          category_id: 2,
          price: 6000,
          stock: 98,
          unit: '100 gr',
          promo: 2,
          max_promo: 3,
          info: '1 buah wortel setara 100 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/wortel_JeEMob6Dg.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: 'Kangkung',
          category_id: 2,
          price: 3000,
          stock: 77,
          unit: '250 gr',
          promo: 2,
          max_promo: 3,
          info: '1 ikat kangkung setara 250 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/kangkung_8Zo-Lsqh_.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          title: 'Apel',
          category_id: 1,
          price: 29000,
          stock: 68,
          unit: '200 gr',
          promo: 2,
          max_promo: 3,
          info: '1 buah apel setara 200 gr',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/apel_EHvAlg9np.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          title: 'Nanas',
          category_id: 1,
          price: 12900,
          stock: 53,
          unit: '550 g',
          promo: 2,
          max_promo: 3,
          info: '1 buah nanas setara 550 g',
          thumbnail: 'https://ik.imagekit.io/1y88cfgc5/nanas_04J5I7ASd.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          title: 'Pepaya',
          category_id: 1,
          price: 15000,
          stock: 56,
          unit: '500 gr',
          promo: 2,
          max_promo: 3,
          info: '1 buah pepaya setara 500 gr',
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
