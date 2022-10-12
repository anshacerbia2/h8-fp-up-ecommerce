const { User, Product } = require('../models');

module.exports = async (request, response, next) => {
  try {
    const { id } = request.user;
    const { id: productId } = request.params;
    const product = await Product.findByPk(productId);
    if (!product) throw { name: 'Not Found', message: 'Product not found' };
    if (+id !== +product.authorId) throw { name: 'Forbidden', message: 'You don\'t have permission for this action.' };
    next();
  } catch (errors) {
    next(errors);
  }
};