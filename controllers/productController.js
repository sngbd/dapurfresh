const productRepository = require('../repository/productRepository');
const { Product } = require('../models');
module.exports = {
  getProduct: async (req, res) => {
    try {
      const get = await productRepository.getProduct();

      return res.respondGet(get);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getByIdProduct: async (req, res) => {
    try {
      const product_id = req.params.id;

      const getByID = await productRepository.getByIdProduct(product_id);

      if (!getByID) return res.respondNotFound(null, `not found data with product_id =  ${product_id}`);

      return res.respondGet(getByID, `Success get data by ${product_id}`);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
