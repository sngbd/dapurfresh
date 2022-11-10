const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const validateOrder = require('../middlewares/validation/validateOrder');

router.route('/').post(
  validateOrder.validateAddOrder,
  orderController.createOrder,
);

// Order By User Id
router.route('/user/lastsevendays').get(orderController.getUserOrderLast7Days);
router.route('/:id/detail/user').get(orderController.getUserOrderDetail);

// Update route status
router.route('/:id/status').patch(
  validateOrder.validateUpdateOrder,
  orderController.updateUserOrderStatus,
);

module.exports = router;
