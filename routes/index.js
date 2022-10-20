const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const productRouter = require('./product');
const helpRouter = require('./help');
const categoryRouter = require('./category');

const validateToken = require('../middlewares/validateToken');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.use('/auth', authRouter);

// protected
// router.use(validateToken);

// product
router.use('/product', productRouter);

// category
router.use('/category', categoryRouter);

// help
router.use('/help', helpRouter);

module.exports = router;
