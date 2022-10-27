require('dotenv').config();

const orderRepository = require('../repository/orderRepository');

const createOrder = async (req, res) => {
  try {
    // calculate sub_total and total cost
    const order_items = req.body.order_items;
    var sub_total = 0;
    for (const order_item of order_items) {
      sub_total += order_item.price;
    }
    req.body.total = sub_total + req.body.delivery_cost;
    req.body.sub_total = sub_total;

    // assign no_order
    const tr_date = new Date(req.body.transaction_date);
    req.body.no_order = "OR-" + tr_date.getFullYear() + '-'
      + (tr_date.getUTCMonth() + 1) + '-'
      + tr_date.getUTCDate() + '-';

    // create order 
    // by creating order in "Orders" table, 
    // creating order item in "Order_Items" table, 
    // and deleting user cart in Carts table
    const order = await orderRepository.createOrder(req.body);

    return res.respondCreated(order, "Order created");
  } catch (error) {
    return res.respondServerError(error.message);
  }
}
const getUserOrderLast7Days = async (req, res) => {
  try {
    const orders = await orderRepository.getUserOrderLast7Days(req.user.id);
    return res.respondGet(orders);
  } catch (error) {
    return res.respondServerError(error.message);
  }
}

const getUserOrderDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await orderRepository.getUserOrderDetail(id, req.user.id);
    if (order === null) {
      return res.respondNotFound(`Order with id '${id}' and user id '${req.user.id}' not found`);
    }
    return res.respondGet(order);
  } catch (error) {
    return res.respondServerError(error.message);
  }
}

const updateUserOrderStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await orderRepository.updateUserOrderStatus(id, req.user.id, req.body);
    if (order === null) {
      return res.respondNotFound(`Order with id '${id}' and user id '${req.user.id}' not found`);
    }
    return res.respondGet(order);
  } catch (error) {
    return res.respondServerError(error.message);
  }
}

module.exports = {
  createOrder,
  getUserOrderLast7Days,
  getUserOrderDetail,
  updateUserOrderStatus
}