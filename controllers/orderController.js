require('dotenv').config();

const orderRepository = require('../repository/orderRepository');

const createOrder = async (req, res) => {
  const { id } = req.user;
  req.body.user_id = id;

  // assign no_order
  const tr_date = new Date();
  req.body.no_order = `OR-${tr_date.getFullYear()}-${(tr_date.getUTCMonth() + 1)}-${tr_date.getUTCDate()}-`;
  req.body.transaction_date = tr_date;
  req.body.status = 'Proses';

  try {
    // create order
    // by creating order in "Orders" table,
    // creating order item in "Order_Items" table,
    // and deleting user cart in Carts table
    const order = await orderRepository.createOrder(req.body);
    return res.respondCreated(order, 'Order created');
  } catch (error) {
    return res.respondServerError(error.message);
  }
};
const getUserOrderLast7Days = async (req, res) => {
  try {
    const orders = await orderRepository.getUserOrderLast7Days(req.user.id);
    return res.respondGet(orders);
  } catch (error) {
    return res.respondServerError(error.message);
  }
};

const getUserOrderDetail = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const order = await orderRepository.getUserOrderDetail(id, user_id);
    if (order === null) {
      return res.respondNotFound(`Order with id '${id}' and user id '${user_id}' not found`);
    }
    return res.respondGet(order);
  } catch (error) {
    return res.respondServerError(error.message);
  }
};

const updateUserOrderStatus = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const order = await orderRepository.updateUserOrderStatus(id, user_id, req.body);
    if (order === null) {
      return res.respondNotFound(`Order with id '${id}' and user id '${user_id}' not found`);
    }
    return res.respondGet(order);
  } catch (error) {
    return res.respondServerError(error.message);
  }
};

module.exports = {
  createOrder,
  getUserOrderLast7Days,
  getUserOrderDetail,
  updateUserOrderStatus,
};
