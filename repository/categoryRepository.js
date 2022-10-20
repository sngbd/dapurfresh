const { Category, Product } = require('../models');

module.exports = {
  getCategory: async (req, res) => {
    try {
      const get = await Category.findAll();
      return get;
    } catch (err) {
      throw err;
    }
  },

  getByIdCategory: async (id) => {
    try {
      const getId = await Category.findOne({ where: { id: id } });

      return getId;
    } catch (err) {
      throw err;
    }
  },

  getProductByCategory: async (id) => {
    try {
      const get = Product.findAll({ where: { category_id: id } });
      return get;
    } catch (err) {
      throw err;
    }
  },
};
