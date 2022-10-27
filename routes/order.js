const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const validateOrder = require('../middlewares/validation/validateOrder');

router.route('/').post(
    validateOrder.validateAddOrder,
    orderController.createOrder
);

// Order By User Id 
router.route('/user').get(orderController.getUserOrderLast7Days);
// router.route('/:id/details/user').get();

// Update route status
// router.route('/:id/status').patch();

module.exports = router;