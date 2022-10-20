const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController');

// product
router.get('/', category.getCategory);
router.get('/:id', category.getCategoryById);
router.get('/product/:id', category.getProductByCategory);

module.exports = router;
