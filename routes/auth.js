const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.route('/login').post(
    authController.login, 
    authController.getTokenAfterLogin
);

router.route('/token').post(authController.getAccessToken);

module.exports = router;