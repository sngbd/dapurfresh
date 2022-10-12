const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// product
router.get('/product', product.getProduct);

module.exports = router;
