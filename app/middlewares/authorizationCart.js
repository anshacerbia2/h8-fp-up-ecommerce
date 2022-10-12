const { Cart } = require('../models');

module.exports = async (request, response, next) => {
  try {
    const { id } = request.user;
    const { id: cartId } = request.params;
    const cart = await Cart.findByPk(cartId);
    if (!cart) throw { status: 404, message: 'Cart not found' };
    if (+id !== +cart.UserId) throw { status: 403, message: 'You don\'t have permission for this action.' };
    next();
  } catch (errors) {
    next(errors);
  }
};