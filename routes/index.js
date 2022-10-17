const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');

const authRouter = require('./auth');
const productRouter = require('./product');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.use('/auth', authRouter);

// product
router.use('/product', productRouter);

module.exports = router;
