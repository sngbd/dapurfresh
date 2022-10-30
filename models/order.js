'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      Order.hasMany(models.Order_Item, {
        foreignKey: 'order_id',
      });
    }
  }
  Order.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    sub_total: DataTypes.INTEGER,
    delivery_cost: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    note: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    no_order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};