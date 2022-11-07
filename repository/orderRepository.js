const { Transaction, Op } = require('sequelize');
const {
  Order, Order_Item, CartItem, Product, Unit, sequelize,
} = require('../models');

const getOrder = async (id, user_id, tr) => {
  const order = await Order.findOne({
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
    ],
    where: { id, user_id },
    include: [{
      model: Order_Item,
      as: 'order_items',
      required: false,
      attributes: [
        'id',
        'product_id',
        'qty',
        'price',
      ],
      include: [{
        model: Product,
        required: true,
        attributes: [
          'title',
          'qty_unit',
        ],
        include: [{
          model: Unit,
          as: 'unit',
          required: true,
          attributes: ['title'],
        }],
      }],
    }],
    transaction: tr,
  });

  const { order_items } = order.dataValues;
  order_items.forEach((order_item) => {
    const product = order_item.dataValues.Product;
    order_item.dataValues.product_name = product.title;
    order_item.dataValues.unit_per_qty = `${product.qty_unit} ${product.unit.title}`;
    delete order_item.dataValues.Product;
  });
  return order;
};

const createOrder = async (Orderjson) => {
  const order_itemsJson = Orderjson.order_items;

  // Make a transaction
  const order = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  }, async (tr) => {
    // assign product_name, unit_per_qty
    order_itemsJson.forEach(async (order_item) => {
      const product = await Product.findOne({
        where: { id: order_item.product_id },
        include: [{ model: Unit, as: 'unit' }],
      });
      order_item.product_name = product.title;
      order_item.unit_per_qty = `${product.qty_unit} ${product.unit.title}`;
    });

    // create tuple order in orders table
    const resultOrder = await Order.create(Orderjson, {
      transaction: tr,
    });

    const { id } = resultOrder;
    const transaction_date = resultOrder.createdAt;
    const no_order = Orderjson.no_order + id;
    const orderUpdatedRows = await Order.update({
      no_order,
      transaction_date,
    }, {
      where: { id },
      transaction: tr,
    });
    if (orderUpdatedRows[0] !== 1) {
      throw Error('error create order');
    }
    resultOrder.no_order = no_order;
    resultOrder.transaction_date = transaction_date;

    // create all order item in order_items table
    const order_itemsPromise = [];
    order_itemsJson.forEach((order_item) => {
      // set order_id in every order item
      order_item.order_id = id;
      order_itemsPromise.push(Order_Item.create(order_item, {
        transaction: tr,
      }));
      delete order_item.order_id;
    });
    await Promise.all(order_itemsPromise);

    // delete user cart
    await CartItem.destroy({
      where: { user_id: Orderjson.user_id },
    }, {
      transaction: tr,
    });

    resultOrder.dataValues.order_items = order_itemsJson;
    delete resultOrder.dataValues.updatedAt;
    return resultOrder;
  });
  return order;
};

const getUserOrderLast7Days = async (user_id) => {
  const dateNow = new Date();
  const date7DaysAgo = new Date(dateNow);
  date7DaysAgo.setUTCDate(dateNow.getUTCDate() - 7);

  const orders = await Order.findAll({
    attributes: ['id', 'transaction_date', 'no_order', 'status'],
    where: {
      user_id,
      transaction_date: {
        [Op.gt]: date7DaysAgo,
      },
    },
    order: [['transaction_date']],
  });

  const ordersGroupByDay = {};
  const dateSearch = new Date(dateNow);
  let i = 0;
  while (true) {
    let day = dateSearch.getUTCDate();
    day = (day < 10) ? `0${day}` : day;

    let month = dateSearch.getMonth();
    month = (month < 10) ? `0${month}` : month;

    const y_m_d = `${dateSearch.getFullYear()}-${dateSearch.getUTCMonth() + 1}-${day}`;
    const ordersInThatDay = orders.filter((order) => order.transaction_date.startsWith(y_m_d));
    ordersGroupByDay[y_m_d] = ordersInThatDay;
    if (i >= 7) break;
    else {
      dateSearch.setUTCDate(dateSearch.getUTCDate() - 1);
      i += 1;
    }
  }
  return ordersGroupByDay;
};

const getUserOrderDetail = async (id, user_id) => getOrder(id, user_id);

const updateUserOrderStatusToBatal = async (id, user_id, orderUpdateJson) => {
  // Make a transaction: update, and get
  const order = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  }, async (tr) => {
    const [updatedRowsCount] = await Order.update(orderUpdateJson, {
      where: { id, user_id },
      transaction: tr,
    });
    if (updatedRowsCount <= 0) {
      return null;
    }

    return getOrder(id, user_id, tr);
  });
  return order;
};

module.exports = {
  createOrder,
  getUserOrderLast7Days,
  getUserOrderDetail,
  updateUserOrderStatusToBatal,
};
