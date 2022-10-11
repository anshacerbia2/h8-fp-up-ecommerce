'use strict';
const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: 'authorId' });
      Product.belongsTo(models.SubCategory);
      Product.hasMany(models.Image, { foreignKey: 'productId' });
      Product.hasMany(models.Cart);
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required.' },
        notEmpty: { msg: 'Name is required.' }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Slug is required.' },
        notEmpty: { msg: 'Slug is required.' }
      },
      unique: {
        args: true,
        msg: 'Slug already in used.'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required.' },
        notEmpty: { msg: 'Description is required.' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price is required.' },
        notEmpty: { msg: 'Price is required.' },
        min: {
          args: [0],
          msg: 'Minimum price required is 0.'
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Main Image is required.' },
        notEmpty: { msg: 'Main Image is required.' }
      }
    },
    harvestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Harvest date is required.' },
        notEmpty: { msg: 'Harvest date is required.' }
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Unit is required.' },
        notEmpty: { msg: 'Unit is required.' },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Stock is required.' },
        notEmpty: { msg: 'Stock is required.' },
        min: {
          args: [0],
          msg: 'Minimum stock required is 0.'
        }
      }
    },
    SubCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product category is required.' },
        notEmpty: { msg: 'Product category is required.' },
        min: {
          args: [1],
          msg: 'Category is required.'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Author is required.' },
        notEmpty: { msg: 'Author is required.' }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {}
  });
  return Product;
};