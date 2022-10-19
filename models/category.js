
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
  class Category extends Model {
    static associate(models) {
      //define association here
      Category.hasMany(models.Product, {
        foreignKey : "category_id",
        onDelete : 'setNull'
      })
    }
  }
  Category.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
}