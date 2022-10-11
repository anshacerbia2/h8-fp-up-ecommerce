'use strict';
const { Model } = require('sequelize');
const { hashPw } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'authorId' });
      User.hasMany(models.Address);
      User.hasMany(models.Order);
      User.hasMany(models.Cart);
    }
  }
  User.init({
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First Name is required.' },
        notEmpty: { msg: 'First Name is required.' },
      }
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last Name is required.' },
        notEmpty: { msg: 'Last Name is required.' },
      }
    },
    avatar: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required.' },
        notEmpty: { msg: 'Email is required.' },
        isEmail: {
          args: true,
          msg: 'Email not valid.'
        }
      },
      unique: {
        args: true,
        msg: 'Email already in used.'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required.' },
        notEmpty: { msg: 'Password is required.' },
        len: {
          args: [6],
          msg: 'Password length required is 6.'
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Role is required.' },
        notEmpty: { msg: 'Role is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (input) => {
        input.password = hashPw(input.password);
        if (!input.avatar) {
          input.avatar = 'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/12/7/31322233-5f86-4e10-b0e4-4e9064b9b89b.jpg';
        }
      }
    }
  });
  User.beforeCreate((user, option) => {
    user.password = hashPw(user.password);
  })
  return User;
};