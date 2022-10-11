const { Cart } = require('../models');

module.exports = async (request, response, next) => {
  try {
    const { id } = request.user;
    const { id: cartId } = request.params;
    const cart = await Cart.findByPk(cartId);
    if (!cart) throw { name: 'Not Found', message: 'Cart not found' };
    if (+id !== +cart.UserId) throw { name: 'Forbidden', message: 'You don\'t have permission for this action.' };
    next();
  } catch (errors) {
    next(errors);
  }
};