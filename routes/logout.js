const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// router.route('/token').post(authController.getAccessToken);
// router.route('/').post(authController.logout);

// router.get('/', function (req, res) {
//   req.logout;
//   req.flash('success', 'You are logged out');
//   return res.respondFail();
// });

module.exports = router;
