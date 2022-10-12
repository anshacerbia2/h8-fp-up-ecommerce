const { Auction, User } = require('../models');

class AuctionController {
  static async createAuction(req, res, next) {
    try {
      const { id: UserId } = req.user
      const { name, imgUrl, description, initPrice } = req.body;
      await Auction.create({ name, imgUrl, description, initPrice, UserId })
      res.status(201).json({
        message: `Product has been created, please wait for admin to response`
      })
    } catch (err) {
      next(err)
    }
  }
  // static async adminReadAuction(req, res, next) {
  //   try {
  //     const data = await Auction.findAll({
  //       include: [
  //         {
  //           model: User,
  //           as: 'Seller'
  //         },
  //         {
  //           model: User,
  //           as: 'Cust'
  //         }
  //       ]
  //     })
  //     res.status(200).json(data)
  //   } catch (err) {
  //     next(err)
  //   }
  // }

  static async approveAuction(req, res, next) {
    try {
      const { id } = req.params
      const d = new Date();
      await Auction.update({ status: 'Approved', AuctionDate: d }, { where: { id } })
      res.status(200).json({
        message: `Updated Status`
      })
    } catch (err) {
      next(err)
    }
  }

  static async archiveAuction(req, res, next) {
    try {
      const { id } = req.params
      const { lastBidPrice, lastBidUserId } = req.body;
      await Auction.update({ status: 'Archived', lastBidPrice, lastBidUserId }, { where: { id } })
      res.status(200).json({
        message: `Auction Done`
      })
    } catch (err) {
      next(err)
    }
  }
  // 
  static async unapprovedAuctions(req, res, next) {
    try {
      const data = await Auction.findAll({
        where: {
          status: `Unapproved`
        },
        include: {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err)
    }
  }

  static async approvedAuctions(req, res, next) {
    try {
      const data = await Auction.findAll({
        where: {
          status: `Approved`
        },
        include: {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err)
    }
  }

  static async archivedAuctions(req, res, next) {
    try {
      const data = await Auction.findAll({
        where: {
          status: `Archived`
        },
        include: {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err)
    }
  }
  // static async readAuctionById(req, res, next) {
  //   try {
  //     const { id } = req.params
  //     const data = await Auction.findByPk(id, {
  //       include: {
  //         model: User,
  //         as: 'Seller'
  //       }
  //     })
  //     res.status(200).json(data)
  //   } catch (err) {
  //     next(err)
  //   }
  // }
  // static async readAuctionByCustId(req, res, next) {
  //   try {
  //     const { id: CustId } = req.user
  //     const data = await Auction.findAll({
  //       where: {
  //         CustId
  //       },
  //       include: {
  //         model: User,
  //         as: 'Seller'
  //       }
  //     })
  //     res.status(200).json(data)
  //   } catch (err) {
  //     next(err)
  //   }
  // }

  // static async updateFinalBid(req, res, next) {
  //   try {
  //     const { } = req.body;
  //     await Auction.update({
  //       ...req.body //lastBidPrice dan CustId
  //     }, {
  //       where: {
  //         id
  //       }
  //     })
  //     res.status(200).json({
  //       msg: `Auction Done`
  //     })
  //   } catch (err) {
  //     next(err)
  //   }
  // }

  // static async payAuction(req, res, next) {
  //   try {
  //     //midtrans terus update status pembayaran
  //   } catch (err) {
  //     next(err)
  //   }
  // }
}

module.exports = AuctionController