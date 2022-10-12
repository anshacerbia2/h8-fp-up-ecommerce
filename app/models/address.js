'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The 'models/index' file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User);
    }
  }
  Address.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address Name is required'
        },
        notNull: {
          msg: 'Address Name is required'
        }
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Street is required'
        },
        notNull: {
          msg: 'Street is required'
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Province is required'
        },
        notNull: {
          msg: 'Province is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'City is required'
        },
        notNull: {
          msg: 'City is required'
        }
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        msg: 'City ID is required'
      },
      notNull: {
        msg: 'City ID is required'
      }
    },
    provinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        msg: 'Province ID is required'
      },
      notNull: {
        msg: 'Province ID is required'
      }
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        msg: 'User ID is required'
      },
      notNull: {
        msg: 'User ID is required'
      }
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};