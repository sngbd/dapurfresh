const { Transaction, Op } = require('sequelize');
const {
  Order, Order_Item, CartItem, Product, sequelize,
} = require('../models');

const getOrder = async (id, user_id, tr) => {
  /*
    select id, name, phone_number, address,
    transaction_date, sub_total, delivery_cost,
    total, note, user_id, status, no_order,
    createdAt,
    order_items.id, order_items.product_id,
    order_items.qty, order_items.price, order_items.discount,
    Products.title, Products.unit
    from Orders
    left outer join Order_Items as order_items on order_items.order_id = id
    inner join Products on order_items.product_id = Products.id
    where id=id, user_id=user_id
  */
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
        'discount',
      ],
      include: [{
        model: Product,
        required: true,
        attributes: [
          'title',
          'unit',
        ],
      }],
    }],
    transaction: tr,
  });

  // if order has found, add product_name and unit to every order_item
  if (order !== null) {
    const { order_items } = order.dataValues;
    order_items.forEach((order_item) => {
      const product = order_item.dataValues.Product;
      order_item.dataValues.product_name = product.title;
      order_item.dataValues.unit = `${product.unit}`;
      delete order_item.dataValues.Product;
    });
  }
  return order;
};

const createOrder = async (Orderjson) => {
  const order_itemsJson = Orderjson.order_items;

  const productsStock = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const order_item of order_itemsJson) {
    // eslint-disable-next-line no-await-in-loop
    const product = await Product.findOne({
      where: { id: order_item.product_id },
    });
    if (product === null) {
      return {
        status: 404,
        message: `can't find product with id '${order_item.product_id}'`,
        data: null,
      };
    }
    // assign product name and unit to order_item for responses
    order_item.product_name = product.title;
    order_item.unit = `${product.unit}`;

    // decrease stock of product
    const stock = product.stock - order_item.qty;
    if (stock < 0) {
      return {
        status: 404,
        message: `qty exceeds product's stock with id '${product.id}'`,
        data: null,
      };
    }
    productsStock[order_item.product_id] = stock;
  }

  // Make a transaction
  const order = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  }, async (tr) => {
    // update product stock
    // eslint-disable-next-line no-restricted-syntax
    for (const order_item of order_itemsJson) {
      // eslint-disable-next-line no-await-in-loop
      const [updatedRowsProduct] = await Product.update({
        stock: productsStock[order_item.product_id],
      }, {
        where: { id: order_item.product_id },
        transaction: tr,
      });

      if (updatedRowsProduct !== 1) {
        throw Error(`error update product's stock with id '${order_item.product_id}'`);
      }
    }

    // create tuple order in orders table
    const resultOrder = await Order.create(Orderjson, {
      transaction: tr,
    });

    // get id of order that has been created
    const { id } = resultOrder;
    // assign to transaction_date
    const transaction_date = resultOrder.createdAt;
    // add id of order to no_order
    const no_order = Orderjson.no_order + id;

    // update no_order and transaction_date
    const [updatedRowsOrder] = await Order.update({
      no_order,
      transaction_date,
    }, {
      where: { id },
      transaction: tr,
    });
    if (updatedRowsOrder !== 1) {
      throw Error('error create order');
    }

    // add no_order and transaction date to response order
    resultOrder.no_order = no_order;
    resultOrder.transaction_date = transaction_date;

    // create all order item in order_items table
    const order_itemsPromise = [];
    await order_itemsJson.forEach((order_item) => {
      // set order_id in every order item
      order_item.order_id = id;
      order_itemsPromise.push(Order_Item.create(order_item, {
        transaction: tr,
      }));
      delete order_item.order_id;
    });
    await Promise.all(order_itemsPromise);

    // delete all user cart
    await CartItem.destroy({
      where: { user_id: Orderjson.user_id },
    }, {
      transaction: tr,
    });

    // add order_items to order
    resultOrder.dataValues.order_items = order_itemsJson;

    delete resultOrder.dataValues.updatedAt;

    return resultOrder;
  });

  return order;
};

const getUserOrderLast7Days = async (user_id) => {
  const dateNow = new Date();
  const date7DaysAgo = new Date(dateNow);

  // set date 7 days ago
  date7DaysAgo.setUTCDate(dateNow.getUTCDate() - 7);
  /*
    select id, transaction_date, no_order, status
    from orders where transaction_date >= date7DaysAgo
    order by transaction_date desc
  */
  const orders = await Order.findAll({
    attributes: ['id', 'transaction_date', 'no_order', 'status'],
    where: {
      user_id,
      transaction_date: {
        [Op.gt]: date7DaysAgo,
      },
    },
    order: [['transaction_date', 'DESC']],
  });

  // Group all orders by day in 7 days
  const ordersGroupByDay = {};
  const dateSearch = new Date(dateNow);
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // convert day to 2 digits
    let day = dateSearch.getUTCDate();
    day = (day < 10) ? `0${day}` : day;

    // convert month to 2 digits
    let month = dateSearch.getMonth();
    month = (month < 10) ? `0${month}` : month;

    // yy-mm-dd formats
    const y_m_d = `${dateSearch.getFullYear()}-${dateSearch.getUTCMonth() + 1}-${day}`;

    // search transaction_date who year, month, and day is yy-mm-dd
    const ordersInThatDay = orders.filter((order) => order.transaction_date.startsWith(y_m_d));

    // if there is any transaction_date in that day
    if (ordersInThatDay.length > 0) {
      ordersGroupByDay[y_m_d] = ordersInThatDay;
    }

    // if already 7 days ago
    if (i >= 7) break;
    else {
      // decrease 1 day
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
    // if there is no updated rows / order not found
    if (updatedRowsCount !== 1) {
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
