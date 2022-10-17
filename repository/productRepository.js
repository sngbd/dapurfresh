const { Product } = require('../models');

const getProduct = async (req, res) => {
  try {
    const get = await Product.findAll();
    return get;
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const getByIdProduct = async (id) => {
  try {
    const getId = await Product.findOne({ where: { id: id } });

    return getId;
  } catch (err) {
    return res.respondServerError(err.message);
  }
};
module.exports = {
  getProduct,
  getByIdProduct,
};
