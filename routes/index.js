const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');

const authRouter = require('./auth');
const productRouter = require('./product');
const validateToken = require('../middlewares/validateToken');
const helpRouter = require('./help');

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

// help
router.use('/help', helpRouter);

module.exports = router;
