const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartController');

router.post('/', cart.addItem);
router.get('/', cart.getCart);
router.put('/', cart.updateItem);
router.delete('/', cart.deleteItem);

module.exports = router;
