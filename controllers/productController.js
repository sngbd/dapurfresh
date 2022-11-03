const productRepository = require('../repository/productRepository');

const getProduct = async (req, res) => {
  try {
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
const updateProduct = async (req, res)=> {
  try {
    const product_id = req.params.id || req.body.product_id;
    const product = await productRepository.getByIdProduct(product_id);
    if (!product) return res.respondNotFound(`not found data with product_id = ${product_id}`);
    const update = await productRepository.updateProduct(product_id, req.body);
    return res.respondCreated(req.body, 'Product updated successfully')
  }
  catch (err){
    return res.respondServerError(err.message);
  }
}
const insertProduct = async (req, res)=> {
  try {
    const insert = await productRepository.newProduct(req.body);
    return res.respondCreated(insert, "Success insert Product")
  }
  catch (err){
    return res.respondServerError(err.message);
  }
}
const getPopularProduct = async(req, res)=> {
  try {
    const popular = await productRepository.getPopularProduct();
    return res.respondGet(popular, "Success get Popular Product");
  }
  catch (err){
    return res.respondServerError(err.message);
  }
}
module.exports = {
  getProduct,
  getByIdProduct,
  updateProduct,
  insertProduct,
  getPopularProduct
};
