const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');

// product
router.get('/', product.getProduct);
router.get('//:id', product.getByIdProduct);

module.exports = router;
