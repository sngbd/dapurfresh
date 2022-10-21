const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validation/validateHelp');

const helpController = require('../controllers/helpController');

router.route('/').get(helpController.getHelp);
router.route('/').post(validator.created, helpController.createHelp);
router.route('/:id').get(helpController.getHelpById);
router.route('/:id').put(validator.created, helpController.updateHelp);
router.route('/:id').delete(helpController.deleteHelp);

module.exports = router;
