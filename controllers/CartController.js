const { Address, Cart, Product, User } = require('../models');
const { Op } = require('sequelize');

class CartController {
  static async getCart(request, response, next) {
    try {
      const { id: UserId } = request.user;
      const cart = await Cart.findAll({
        where: { UserId },
        order: [['id', 'DESC']],
        include: [
          {
            model: Product,
            attributes: ['name', 'price', 'mainImg', 'harvestDate']
          },
          {
            model: User,
            attributes: { exclude: ['createAt', 'updatedAt', 'email', 'password', 'gender', 'phoneNumber'] },
            include: {
              model: Address,
              where: {
                default: { [Op.eq]: true }
              },
              attributes: ['city']
            }
          }
        ]
      });
      response.status(200).json(cart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addCart(request, response, next) {
    try {
      const { id: UserId } = request.user;
      const { quantity, ProductId } = request.body;
      const product = await Product.findByPk(ProductId);
      if (!product) throw { status: 404, message: 'Product not found' };

      const oldCart = await Cart.findOne({ where: { UserId, ProductId } });
      if (oldCart) {
        await Cart.update({ quantity: oldCart.quantity + quantity }, { where: { id: { [Op.eq]: oldCart.id } } });
      } else {
        await Cart.create({ UserId, ProductId, quantity });
      }
      response.status(201).json({
        message: 'Product has been successfully added to cart.'
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteCart(request, response, next) {
    try {
      const { id } = request.params;
      await Cart.destroy({ where: { id } });
      response.status(200).json({ message: 'Product has been successfully deleted from cart.' });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async incCart(request, response, next) {
    try {
      const { id } = request.params;
      await Cart.increment({ quantity: 1 }, { where: { id } })
      response.status(200).json({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }

  static async decCart(request, response, next) {
    try {
      const { id } = request.params;
      await Cart.increment({ quantity: -1 }, { where: { id } })
      response.status(200).json({ message: 'Success.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;