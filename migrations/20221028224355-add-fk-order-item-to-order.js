'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Order_Items', {
      fields: ["order_id"],
      type: 'foreign key',
      name: 'FK_Orders_Order_Items',
      references: {
        table: 'Orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Order_Items', 'FK_Orders_Order_Items');
  }
};
