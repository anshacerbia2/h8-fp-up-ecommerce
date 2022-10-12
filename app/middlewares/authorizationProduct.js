const { User, Product } = require('../models');

module.exports = async (request, response, next) => {
  try {
    const { id } = request.user;
    const { id: productId } = request.params;
    const product = await Product.findByPk(productId);
    if (!product) throw { status: 404, message: 'Product not found' };
    if (+id !== +product.authorId) throw { status: 403, message: 'You don\'t have permission for this action.' };
    next();
  } catch (errors) {
    next(errors);
  }
};