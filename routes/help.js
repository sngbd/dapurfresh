const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validateHelp');

const helpController = require('../controllers/helpController');

router.route('/').get(helpController.getHelp);
router.route('/').post(validator.created, helpController.createHelp);

module.exports = router;
