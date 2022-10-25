const { Product, Unit } = require('../models');

const getProduct = async () => {
  const get = await Product.findAll({
    include: [
      {
        model: Unit,
        as: 'unit',
        attributes: ['title'],
      },
    ],
  });

  return get;
};

const getByIdProduct = async (id) => {
  const getId = await Product.findOne({ where: { id } });

  return getId;
};

module.exports = {
  getProduct,
  getByIdProduct,
};
