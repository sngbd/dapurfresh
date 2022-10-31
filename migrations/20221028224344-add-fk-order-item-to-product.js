'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Order_Items', {
      fields: ["product_id"],
      type: 'foreign key',
      name: 'FK_Products_Order_Items',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Order_Items', 'FK_Products_Order_Items');
  }
};
