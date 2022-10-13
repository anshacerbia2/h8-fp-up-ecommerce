'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuctionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuctionHistory.belongsTo(models.Auction);
      AuctionHistory.belongsTo(models.User, { foreignKey: 'SellerId', as: `Seller` })
      AuctionHistory.belongsTo(models.User, { foreignKey: 'WinnerId', as: 'Winner' })
    }
  }
  AuctionHistory.init({
    AuctionId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    WinnerId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'AuctionHistory',
  });
  return AuctionHistory;
};