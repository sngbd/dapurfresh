const { Transaction } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    }, async (tr) => {
      const bulkUpdatePromise = [];
      let i = 1;
      const dateNow = new Date();
      const dateSearch = new Date(dateNow);
      while (true) {
        console.log(dateSearch);
        bulkUpdatePromise.push(queryInterface.bulkUpdate('Orders', {
          transaction_date: new Date(dateSearch),
        }, {
          id: i,
        }, {
          transaction: tr,
        }));

        if (i >= 8) break;
        else {
          dateSearch.setUTCDate(dateSearch.getUTCDate() - 1);
          i += 1;
        }
      }

      await Promise.all(bulkUpdatePromise);
    });
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
