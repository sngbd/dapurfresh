const { Product } = require('../models');

module.exports = {
  getProduct: async (req, res) => {
    try {
      const get = await Product.findAll();
      return get;
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getByIdProduct: async (id) => {
    try {
      const getId = await Product.findOne({ where: { id: id } });

      return getId;
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
