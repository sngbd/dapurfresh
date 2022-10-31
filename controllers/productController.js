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
const UpdateProduct = async (req, res)=> {
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
const InsertProduct = async (req, res)=> {
  try {
    const insert = await productRepository.newProduct(req.body);
    return insert.dataValues;
  }
  catch {
    return res.respondServerError(err.message)
  }
}
module.exports = {
  getProduct,
  getByIdProduct,
  UpdateProduct,
  InsertProduct
};
