const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const register = require('../controllers/registerController');
// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// product
router.get('/product', product.getProduct);
router.post('/register', register.postUser);

module.exports = router;
