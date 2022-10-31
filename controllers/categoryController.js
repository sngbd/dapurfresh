const categoryRepository = require('../repository/categoryRepository');
const productRepository = require('../repository/productRepository');

module.exports = {
  getCategory: async (req, res) => {
    try {
      const get = await categoryRepository.getCategory();
      return res.respondGet(get);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category_id = req.params.id;
      const rslt = await categoryRepository.getByIdCategory(category_id);
      if (rslt) return res.respondGet(rslt);
      return res.respondNotFound(`not found category by id : ${category_id}`);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
  getProductByCategory: async (req, res) => {
    try {
      const category_id = req.params.id;
      const rslt = await productRepository.getProductByCategory(category_id);
      if (rslt) return res.respondGet(rslt);
      return res.respondNotFound(`Category by id ${category_id} or product that has category ${category_id} doesn't exist`);
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
