const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validation/validateUnit');

const unitController = require('../controllers/unitController');

router.route('/').get(unitController.getUnit);
router.route('/').post(validator.created, unitController.createUnit);
router.route('/:id').get(unitController.getUnitById);
router.route('/:id').put(validator.created, unitController.updateUnit);
router.route('/:id').delete(unitController.deleteUnit);

module.exports = router;
