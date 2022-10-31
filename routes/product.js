const express = require('express');

const router = express.Router();
const product = require('../controllers/productController');
const validator = require('../middlewares/validation/validateProduct');

// product
router.route('/').get(product.getProduct);
router.route('/:id').get(product.getByIdProduct);
router.route('/newProduct').post(validator.addUpdateProduct, product.newProduct);
router.route('/:id').put(validator.addUpdateProduct, product.UpdateProduct);
module.exports = router;
