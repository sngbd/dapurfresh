const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const helpRouter = require('./help');
const categoryRouter = require('./category');
const unitRouter = require('./unit');
const cartRouter = require('./cart');
const profileRouter = require('./profile');
const orderRouter = require('./order');
const validateToken = require('../middlewares/validation/validateToken');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.use('/auth', authRouter);

// protected
router.use(validateToken);

// product
router.use('/product', productRouter);

// category
router.use('/category', categoryRouter);

// help
router.use('/help', helpRouter);

// unit
router.use('/unit', unitRouter);

// cart
router.use('/cart', cartRouter);

// order
router.use('/orders', orderRouter);

// profile
router.use('/profile', profileRouter);

module.exports = router;
