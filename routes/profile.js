const express = require('express');
const router = express.Router();
const profile = require('../controllers/profileController');
const upload = require('../middlewares/middlewareUpload');
const validator = require('../middlewares/validation/validateUser');

// profile
router.route('/:id').put(upload, validator.created, profile.updateProfile);
router.route('/:id').get(profile.getMyProfile);

module.exports = router;
