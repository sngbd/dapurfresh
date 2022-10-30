'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Orders', {
      fields: ["user_id"],
      type: 'foreign key',
      name: 'FK_Users_Orders',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Orders', 'FK_Users_Orders');
  }
};
