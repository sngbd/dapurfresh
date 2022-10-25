const express = require('express');

const router = express.Router();
const product = require('../controllers/productController');

// product
router.route('/').get(product.getProduct);
router.route('/:id').get(product.getByIdProduct);

module.exports = router;
