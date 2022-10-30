const express = require('express');

const router = express.Router();
const category = require('../controllers/categoryController');

// category
router.route('/:id').get(category.getCategoryById);
router.route('/').get(category.getCategory);
router.route('/product/:id').get(category.getProductByCategory);
router.route('/test').get(category.testGetProd);
module.exports = router;
