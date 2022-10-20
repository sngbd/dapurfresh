const { Category } = require('../models');
const { Product } = require ('../models');
module.exports = {
  getCategory: async (req, res) => {
    try {
      const get = await Category.findAll();
      return get;
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getByIdCategory: async (id) => {
    try {
      const getId = await Category.findOne({ where: { id: id } });

      return getId;
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getProductByCategory: async(id)=> {
    try {
        const get = Product.findAll({where : {category_id : id}});
        return get;
    }
    catch (err){
        return res.respondServerError(err.message);
    }
    
  }
};
