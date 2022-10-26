'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Order_Items',
      [
        {
          product_id: 1,
          qty: 5,
          price: 9000,
          order_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          qty: 1,
          price: 4000,
          order_id: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          qty: 7,
          price: 15000,
          order_id: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 1,
          qty: 2,
          price: 15000,
          order_id: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          qty: 3,
          price: 9000,
          order_id: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 4,
          qty: 5,
          price: 20000,
          order_id: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 3,
          qty: 2,
          price: 17000,
          order_id: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 2,
          qty: 4,
          price: 16000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 10,
          qty: 8,
          price: 64000,
          order_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 8,
          qty: 15,
          price: 75000,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 9,
          qty: 2,
          price: 12000,
          order_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 6,
          qty: 2,
          price: 8000,
          order_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 5,
          qty: 1,
          price: 7000,
          order_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_id: 7,
          qty: 4,
          price: 28000,
          order_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    );

  },

  async down (queryInterface, Sequelize) {

  }
};
