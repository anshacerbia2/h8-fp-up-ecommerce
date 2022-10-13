'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auction.belongsTo(models.User);
    }
  }
  Auction.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    initPrice: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    AuctionDate: DataTypes.DATE,
    AuctionDateEnd: DataTypes.DATE,
    lastBidPrice: DataTypes.INTEGER,
    lastBidUserId: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Auction',
  });
  return Auction;
};