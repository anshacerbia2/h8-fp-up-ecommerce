'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.hasMany(models.Product);
      SubCategory.belongsTo(models.Category);
    }
  }
  SubCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required.' },
        notEmpty: { msg: 'Name is required.' }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category is required.' },
        notEmpty: { msg: 'Category is required.' }
      }
    }
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};