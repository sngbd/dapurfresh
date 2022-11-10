/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Order_Items',
      [
        {
          product_id: 7,
          qty: 4,
          price: 60000,
          order_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 5,
          qty: 1,
          price: 29000,
          order_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 6,
          qty: 2,
          price: 25800,
          order_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          qty: 4,
          price: 60000,
          order_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          qty: 2,
          price: 12000,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 4,
          qty: 5,
          price: 15000,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 1,
          qty: 2,
          price: 12000,
          order_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          qty: 3,
          price: 18000,
          order_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 1,
          qty: 5,
          price: 30000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          qty: 1,
          price: 15000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          qty: 7,
          price: 42000,
          order_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  async down() {
    return null;
  },
};
