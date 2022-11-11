const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validation/validateCart');
const cartController = require('../controllers/cartController');

router.post('/', validator.addUpdateItem, cartController.addItem);
router.get('/', cartController.getCart);
router.put('/', validator.addUpdateItem, cartController.updateItem);
router.delete('/', validator.deleteItem, cartController.deleteItem);

// Get Count Item And price total Cart User
router.route('/numOfItemsAndTotal').get(cartController.getNumItemsAndTotalPrice);

module.exports = router;
