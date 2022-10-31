'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Order_Items',
      [
        {
          product_id: 7,
          product_name: 'Pepaya',
          unit_per_qty: '1 kg',
          qty: 4,
          price: 60000,
          order_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 5,
          product_name: 'Apel',
          unit_per_qty: '1 kg',
          qty: 1,
          price: 29000,
          order_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 6,
          product_name: 'Nanas',
          unit_per_qty: '1 kg',
          qty: 2,
          price: 25800,
          order_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 2,
          product_name: 'Belimbing',
          unit_per_qty: '1 kg',
          qty: 4,
          price: 60000,
          order_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          product_name: 'Wortel',
          unit_per_qty: '1 kg',
          qty: 2,
          price: 12000,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 4,
          product_name: 'Kangkung',
          unit_per_qty: '1 ikat',
          qty: 5,
          price: 15000,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 1,
          product_name: 'Kol',
          unit_per_qty: '1 kg',
          qty: 2,
          price: 12000,
          order_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          product_name: 'Wortel',
          unit_per_qty: '500 gr',
          qty: 3,
          price: 18000,
          order_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 1,
          product_name: 'Kol',
          unit_per_qty: '1 kg',
          qty: 5,
          price: 30000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          product_name: 'Belimbing',
          unit_per_qty: '1 kg',
          qty: 1,
          price: 15000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          product_name: 'Wortel',
          unit_per_qty: '500 gr',
          qty: 7,
          price: 42000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    );
  },

  async down (queryInterface, Sequelize) {

  }
};
