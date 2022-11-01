const { Order, Order_Item, CartItem, Product, Unit, sequelize } = require('../models'); 
const { Transaction, Op } = require('sequelize');

const createOrder = async (Orderjson) => {
  const order_itemsJson = Orderjson.order_items;
  // to create order, set to undefined
  Orderjson.order_items = undefined;


  try {
    // assign product_name, unit_per_qty, price
    // calculate sub_total and total cost
    var sub_total = 0;
    for (const order_item of order_itemsJson) {
      const product = await Product.findOne({
        where: { id: order_item.product_id },
        include: [{ model: Unit, as: 'unit' }]
      });
      // console.log(product);
      order_item.product_name = product.title;
      order_item.unit_per_qty = `${product.qty_unit} ${product.unit.title}`;
      order_item.price = product.price * order_item.qty;
      sub_total += order_item.price;
    }
    Orderjson.total = sub_total + Orderjson.delivery_cost;
    Orderjson.sub_total = sub_total;
    // console.log(Orderjson);
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
    console.log(err);
    throw err;
  }
}

const getUserOrderLast7Days = async (user_id) => {
  var dateNow = new Date();
  var date7DaysAgo = new Date(dateNow);
  date7DaysAgo.setUTCDate(-7);
  
  try {
    const orders = await Order.findAll({
      attributes: ['id', 'transaction_date', 'no_order', 'status'],
      where: {
        user_id,
        transaction_date: {
          [Op.lt]: dateNow,
          [Op.gt]: date7DaysAgo
        }
      },
      order: [['transaction_date']]
    });
    
    const orderGroupByDay = {};
    var dateSearch = new Date(dateNow);
    for (let i = 0; i < 7; i++) {
      dateSearch.setUTCDate(dateSearch.getUTCDate()-1);
      const day = dateSearch.getUTCDate();
      const y_m_d = dateSearch.getFullYear() + '-' + (dateSearch.getUTCMonth()+1) + '-' + day;
      orderGroupByDay[y_m_d] = [];
      for (const order of orders) {
        var idx = order.transaction_date.indexOf('-')+1;
        idx = order.transaction_date.indexOf('-', idx)+1;
        if (order.transaction_date.startsWith(day, idx)) {
          orderGroupByDay[y_m_d].push(order);
        }
      }
    }
    return orderGroupByDay;
  } catch (error) {
    // console.log(error);
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
      where: { id, user_id, },
      include: [{
        model: Order_Item,
        as: 'order_items',
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
      orderUpdateJson, { where: { id, user_id } }
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
      where: { id, user_id, },
      include: [{
        model: Order_Item,
        as: 'order_items',
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