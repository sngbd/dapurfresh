const { Product } = require('../models');

module.exports = {
  getProduct: async (req, res) => {
    try {
      const get = await Product.findAll();

      return res.respondGet(get);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
