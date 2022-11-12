'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Unit, Category, Order_Item, CartItem }) {
      // define association here
      Product.belongsTo(Category, {
        foreignKey: 'category_id',
        targetKey: 'id',
      });
      Product.hasMany(Order_Item, {
        foreignKey: 'product_id',
      });
      Product.hasMany(CartItem, {
        foreignKey: 'product_id',
      });
      this.belongsToMany(User, { through: 'Cart_Item' });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      unit: DataTypes.TEXT,
      promo: DataTypes.INTEGER,
      max_promo: DataTypes.INTEGER,
      info: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
