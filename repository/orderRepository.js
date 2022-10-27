const { Order, Order_Item, CartItem, sequelize } = require('../models'); 
const { Transaction, QueryTypes } = require('sequelize');

const createOrder = async (Orderjson) => {
  const order_itemsJson = Orderjson.order_items;
  // to create order, set to undefined
  Orderjson.order_items = undefined;

  try {
    // Make a transaction
    var resultOrder = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }, async (tr) => {
      // create tuple order in orders table
      var resultOrder = await Order.create(Orderjson, {
        transaction: tr
      });

      const id = resultOrder.id;
      const no_order = Orderjson.no_order + id;
      const resultOrderUpdated = await Order.update({ no_order }, {
        where: { id },
        transaction: tr
      });
      resultOrder.no_order = no_order;

      // create tuple item order in order_items table
      for (const order_item of order_itemsJson) {
        // set order_id in every order item
        order_item.order_id = id;
        await Order_Item.create(order_item, {
          transaction: tr
        });
      }

      // delete user cart
      await CartItem.destroy({
        where: { user_id: Orderjson.user_id }
      }, {
        transaction: tr
      });
      return resultOrder;
    });

    // id of order
    Orderjson.id = resultOrder.id;
    Orderjson.no_order = resultOrder.no_order;

    // assign again from undefined
    Orderjson.order_items = order_itemsJson;


    return Orderjson;
  } catch (err) {
    throw err;
  }
}

// const getUserOrderLast7Days = async (user_id) => {
//   const orders = await Order.findAll({
//     where: { 
//       user_id: user_id,
//       transaction_date: {
//         [Op.lt]: new Date(),
//         [Op.gt]: new Date() - "0-0-7 0:0:0"
//       }
//     }
//   });

//   return orders;
// }

module.exports = {
  createOrder, 
  // getUserOrderLast7Days
};