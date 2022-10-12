'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    ref_code: DataTypes.STRING,
    ref_code_friend: DataTypes.STRING,
    thumbnail: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};