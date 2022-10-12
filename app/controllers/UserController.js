const { comparePw, jwtSign } = require('../helpers');
const { Order, OrderItem, Address, User, sequelize } = require('../models');
const { Op } = require('sequelize');

class UserController {
  static async users(request, response, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async user(request, response, next) {
    try {
      const { id } = request.params;
      const users = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: {
          model: Address
        }
      });
      if (!users) throw { status: 404, message: 'User not found.' };
      response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async register(request, response, next) {
    try {
      const { fName, lName, email, password, gender } = request.body;
      await User.create({ fName, lName, email, password, gender, role: 'user' });
      response.status(201).json({ message: 'Account has been successfully added.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(request, response, next) {
    try {
      const { email, password } = request.body;
      if (!email && !password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'email',
              message: 'Email is required'
            },
            {
              path: 'password',
              message: 'Password is required'
            }
          ]
        }
      } else if (!email && password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'email',
              message: 'Email is required'
            }
          ]
        }
      } else if (email && !password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'password',
              message: 'Password is required'
            }
          ]
        }
      }

      let user = await User.findOne({
        where: {
          email: {
            [Op.eq]: email
          }
        }
      });
      if (!user) throw ({ status: 401, message: 'Invalid email or password' });

      const validPassword = comparePw(password, user.password);
      if (!validPassword) throw ({ status: 401, message: 'Invalid email or password' });

      delete user.password;
      const token = jwtSign({ id: user.id, role: user.role });
      response.status(200).json({
        access_token: token,
        user
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAddress(request, response, next) {
    try {
      const { id } = request.user;
      const user = await User.findByPk(id, { include: Address });
      if (!user) throw { status: 404, message: 'User not found.' };
      let stat = false;
      if (user.Addresses.length) stat = true;
      const { name, street, province, provinceId, city, cityId } = request.body;
      await Address.create({ name, street, province, provinceId, city, cityId, default: true, UserId: id });
      response.status(201).json({ message: 'Address has been successfully added.' });
    } catch (error) {
      next(error);
    }
  }

  static async orderList(request, response, next) {
    try {
      const { id: UserId } = request.user;
      const orders = await Order.findAll({
        where: { UserId },
        include: OrderItem
      });
      response.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;