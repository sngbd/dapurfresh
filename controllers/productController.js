const productRepository = require('../repository/productRepository');
const { Product, Unit } = require('../models');

const getProduct = async (req, res) => {
  try {
    // const get = await Product.findAll({
    //   include: [
    //     {
    //       model: Unit,
    //       as: 'unit',
    //       attributes: ['title'],
    //     },
    //   ],
    // });
    const get = await productRepository.getProduct();

    return res.respondGet(get);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

const getByIdProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    const getByID = await productRepository.getByIdProduct(product_id);

    if (!getByID) return res.respondNotFound(`not found data with product_id =  ${product_id}`);

    return res.respondGet(getByID, `Success get data by ${product_id}`);
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getProduct,
  getByIdProduct,
};
