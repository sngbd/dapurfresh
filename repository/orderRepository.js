const { Order, Order_Item, CartItem, sequelize } = require('../models'); 
const { Transaction, Op } = require('sequelize');

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
      await Order.update({ no_order }, {
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
    Orderjson = resultOrder.dataValues;

    // assign again from undefined
    Orderjson.order_items = order_itemsJson;


    return Orderjson;
  } catch (err) {
    throw err;
  }
}

const getUserOrderLast7Days = async (user_id) => {
  const dateNow = new Date();
  var date7DaysAgo = new Date();
  date7DaysAgo.setUTCDate(dateNow.getUTCDate() - 7);

  try {
    const orders = await Order.findAll({
      attributes: ['id', 'transaction_date', "no_order"],
      where: {
        user_id:1,
        transaction_date: {
          [Op.lt]: dateNow,
          [Op.gt]: date7DaysAgo
        }
      },
      include: [{
        model: Order_Item,
        attributes: ['id', 'product_id', 'product_name'],
        required: false,
      }]
    });

    return orders;
  } catch (error) {
    throw error;
  }
}

const getUserOrderDetail = async (id, user_id) => {
  try {
    const orders = await Order.findOne({
      attributes: [
        'id', 
        'name', 
        'phone_number',
        'address',
        'transaction_date', 
        'sub_total',
        'delivery_cost',
        'total',
        'note',
        'user_id',
        'status',
        'no_order',
        'createdAt',
        'updatedAt'
      ],
      where: {
        id,
        user_id,
      },
      include: [{
        model: Order_Item,
        required: false,
      }]
    });
    return orders;
  } catch (error) {
    throw error;
  }
}

const updateUserOrderStatus = async (id, user_id, orderUpdateJson) => {
  try {
    const [updatedRowsCount] = await Order.update(
      orderUpdateJson, {
        where: { id, user_id }
      }
    );
    if (updatedRowsCount <= 0) {
      return null;
    }

    const updatedRows = await Order.findOne({
      attributes: [
        'id', 
        'name', 
        'phone_number',
        'address',
        'transaction_date', 
        'sub_total',
        'delivery_cost',
        'total',
        'note',
        'user_id',
        'status',
        'no_order',
        'createdAt',
        'updatedAt'
      ],
      where: {
        id,
        user_id,
      },
      include: [{
        model: Order_Item,
        required: false,
      }]
    });

    return updatedRows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder, 
  getUserOrderLast7Days,
  getUserOrderDetail,
  updateUserOrderStatus
};