const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const register = require('../controllers/authController');
const validator = require('../middlewares/validators');
// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.post('/register', validator.registerUser, register.postUser);

// product
router.get('/product', product.getProduct);
router.get('/product/:id', product.getByIdProduct);

module.exports = router;
