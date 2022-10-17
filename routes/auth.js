const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validators');

const authController = require('../controllers/authController');

router.route('/login').post(
    validator.loginUser,
    authController.login, 
    authController.getTokenAfterLogin
);

router.route('/register').post(validator.registerUser, authController.postUser);
router.route('/token').post(authController.getAccessToken);

module.exports = router;