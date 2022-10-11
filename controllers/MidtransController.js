const midtransClient = require('midtrans-client');
const { SubCategory, Category, User, Address, Order, Cart, OrderItem, Product, sequelize } = require('../models');

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

class MidtransController {
  static async charge(request, response, next) {
    const t = await sequelize.transaction();
    try {
      const { id: UserId } = request.user;
      const { bank } = request.body;
      console.log(bank);
      const user = await User.findByPk(UserId, {
        include: {
          model: Address
        }
      });

      const carts = await Cart.findAll({
        where: { UserId },
        include: {
          model: Product,
          include: [
            {
              model: User,
              include: {
                model: Address
              }
            },
            {
              model: SubCategory,
              include: {
                model: Category
              }
            },
          ]
        }
      });

      const customer_details = {
        first_name: user.fName,
        last_name: user.lName,
        email: user.email,
        phone: user.phone
      }

      const address = user.Addresses.find(v => v.default === true);

      const shipping_address = {
        first_name: user.fName,
        last_name: user.lName,
        phone: user.phone,
        address: address.street,
        city: address.city
      }

      const item_list = [];
      carts.forEach(v => {
        item_list.push({
          name: v.Product.name,
          price: v.Product.price,
          itemImg: v.Product.mainImg,
          SubCategoryId: v.Product.SubCategory.id,
          SubCategoryName: v.Product.SubCategory.name,
          CategoryId: v.Product.SubCategory.Category.id,
          CategoryName: v.Product.SubCategory.Category.name,
          quantity: v.quantity,
          author: v.Product.User.fName + ' ' + v.Product.User.lName,
          authorImg: v.Product.User.avatar,
          authorId: v.Product.User.id
        });
      });

      // const group_seller = {};
      // carts.forEach(v => {
      //   if (!group_seller[v.Product.User.email]) {
      //     console.log([v.Product.User.email]);
      //     group_seller[v.Product.User.email] = {
      //       item_list: [],
      //       city: v.Product.User.Addresses.find(v => v.default === true).city,
      //       totalPrice: 0,
      //     };
      //   }
      //   group_seller[v.Product.User.email].item_list.push({
      //     name: v.Product.name,
      //     price: v.Product.price,
      //     category: v.Product.SubCategory.Category.name + ' ' + v.Product.SubCategory.name,
      //     quantity: v.quantity
      //   });
      //   group_seller[v.Product.User.email].totalPrice += (v.quantity * v.Product.price)
      // });

      const amount = carts.reduce((total, obj) => total + (obj.quantity * obj.Product.price), 0);

      let data = {
        payment_type: "bank_transfer",
        transaction_details: {
          gross_amount: amount,
          order_id: new Date().getTime()
        },
        bank_transfer: { bank }
      }

      const chargeResponse = await coreApi.charge(JSON.stringify(data));

      const newOrder = await Order.create({
        UserId,
        order_id: chargeResponse.order_id,
        transaction_status: chargeResponse.transaction_status,
        transaction_time: chargeResponse.transaction_time,
        response: JSON.stringify(chargeResponse)
      }, { transaction: t });

      item_list.forEach(v => v.OrderId = newOrder.id);

      await OrderItem.bulkCreate(item_list, { transaction: t });

      await t.commit();
      response.status(201).json(chargeResponse);
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  //
  static async notification(request, response, next) {
    try {
      let notificationJson = await coreApi.transaction.notification(request.body);
      await Order.update({ response_midtrans: JSON.stringify(notificationJson) }, { where: { order_id: notificationJson.order_id } });
      response.status(200).json('OK')
    } catch (error) {
      next(error)
    }
  }
}
module.exports = MidtransController;