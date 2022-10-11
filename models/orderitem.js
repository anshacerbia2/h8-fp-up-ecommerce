'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order);
    }
  }
  OrderItem.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    itemImg: DataTypes.STRING,
    SubCategoryId: DataTypes.INTEGER,
    SubCategoryName: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    CategoryName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    author: DataTypes.STRING,
    authorImg: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};