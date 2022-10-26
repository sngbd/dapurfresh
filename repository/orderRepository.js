const { Order, Order_Item, CartItem, sequelize } = require('../models'); 
const { Transaction, QueryTypes } = require('sequelize');

const createOrder = async (Orderjson) => {
  const order_itemsJson = Orderjson.order_items;
  // to create order, set to undefined
  Orderjson.order_items = undefined;

  // Orderjson.no_order += order_id;

  // for (const order_item of order_itemsJson) {
  //   // set order_id in every order item
  //   order_item.order_id = order_id;
  // }

  try {
    // Make a transaction
    const resultOrder = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    }, async (tr) => {
      // create tuple order in orders table
      const resultOrder = await Order.create(Orderjson, {
        transaction: tr
      });

      // create tuple item order in order_items table
      for (const order_item of order_itemsJson) {
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

    // assign again from undefined
    Orderjson.order_items = order_itemsJson;

    return Orderjson;
  } catch (err) {
    throw err;
  }
};

const idOrderAfterInserted = async () => {
  const seq = await sequelize.query("SELECT last_value, is_called FROM \"Orders_id_seq\"", { type: QueryTypes.SELECT });

  seq[0].last_value = parseInt(seq[0].last_value);

  if (seq[0].last_value === 1) {
    if (seq[0].is_called === false) {
      return 1;
    } else {
      return 2
    }
  }

  return seq[0].last_value + 1;
}

module.exports = {
  createOrder, idOrderAfterInserted
};