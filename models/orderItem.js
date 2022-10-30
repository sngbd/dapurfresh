'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Item.belongsTo(models.Order, {
        foreignKey: 'product_id'
      });
      Order_Item.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
    }
  }
  Order_Item.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Item',
  });
  return Order_Item;
};