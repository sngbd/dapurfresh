const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');

const authRouter = require('./auth');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.use('/auth', authRouter);

// product
router.get('/product', product.getProduct);
router.get('/product/:id', product.getByIdProduct);

module.exports = router;
