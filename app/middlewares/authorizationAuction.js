const { Auction } = require('../models');

module.exports = async (request, response, next) => {
  try {
    const { role } = request.user;
    const { id: auctionId } = request.params;
    const auction = await Auction.findByPk(auctionId);
    if (!auction) throw { status: 404, message: 'Item not found' };
    if (role !== 'superadmin') throw { status: 403, message: 'You don\'t have permission for this action.' };
    next();
  } catch (errors) {
    next(errors);
  }
};