const { Category, Product } = require('../models');

const getCategory = async () => {
  const get = await Category.findAll();
  return get;
};

const getByIdCategory = async (id) => {
  const getId = await Category.findOne({ where: { id } });

  return getId;
};

const getProductByCategory = async (id) => {
  const get = Product.findAll({ where: { category_id: id } });
  return get;
};

module.exports = {
  getCategory,
  getByIdCategory,
  getProductByCategory,
};
