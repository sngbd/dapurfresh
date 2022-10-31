const categoryRepository = require('../repository/categoryRepository');
const productRepository = require('../repository/productRepository');

const getCategory = async (req, res) => {
  try {
    const get = await categoryRepository.getCategory();
    return res.respondGet(get);
  }
  catch (err){
    console.log(err.message);
    return res.respondServerError(err.message);
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category_id = req.params.id;
    const rslt = await productRepository.getByIdCategory(category_id);
    if (rslt) return res.respondGet(rslt);
    return res.respondNotFound(`category by id ${category_id} not found`);
  }
  catch (err){
    console.log (err)
    res.respondServerError(err.message);
  }
}
const getProductByCategory = async (req, res)=> {
  try {
    const category_id = req.params.id;
    const rslt = await productRepository.getProductByCategory(category_id);
    if (rslt) return res.respondGet(rslt);
    return res.respondNotFound(`Category by id ${category_id} or product that has category ${category_id} doesn't exist`);
  } catch (err) {
    return res.respondServerError(err.message);
  }
}
module.exports = {
  getCategory,
  getCategoryById,
  getProductByCategory
};
