const express = require('express');
const router = express.Router();
const help = require('../controllers/helpController');
const authController = require('../controllers/authController');
// product
router.get('/', help.getHelp);

module.exports = router;
