const express = require('express');

const router = express.Router();
const product = require('../controllers/productController');
const validator = require('../middlewares/validation/validateProduct');

// product
router.route('/').get(product.getProduct);
router.route('/popular').get(product.getPopularProduct);
router.route('/:id').get(product.getByIdProduct);
router.route('/newProduct').post(product.insertProduct);
router.route('/:id').put(product.updateProduct);

module.exports = router;
