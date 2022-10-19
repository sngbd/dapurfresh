const { Product, Unit } = require('../models');
const respondHelper = require('../helpers/response');

const getProduct = async (req, res) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

const getByIdProduct = async (id) => {
  try {
    const getId = await Product.findOne({ where: { id: id } });

    return getId;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProduct,
  getByIdProduct,
};
