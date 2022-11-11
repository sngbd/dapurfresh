// const { Transaction } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const bulkUpdatePromise = [];
    let i = 1;
    const dateNow = new Date();
    const dateSearch = new Date(dateNow);
    dateSearch.setUTCDate(dateNow.getUTCDate() - 6);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      bulkUpdatePromise.push(queryInterface.bulkUpdate('Orders', {
        transaction_date: new Date(dateSearch),
        no_order: `OR-${dateSearch.getFullYear()}-${(dateSearch.getUTCMonth() + 1)}-${dateSearch.getUTCDate()}-${i}`,
      }, {
        id: i,
      }));

      if (i >= 7) break;
      else {
        dateSearch.setUTCDate(dateSearch.getUTCDate() + 1);
        i += 1;
      }
    }

    await Promise.all(bulkUpdatePromise);
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
