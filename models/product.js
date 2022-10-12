'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    category_id: DataTypes.INTEGER,
    price: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    promo: DataTypes.STRING,
    max_promo: DataTypes.STRING,
    info: DataTypes.TEXT,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};