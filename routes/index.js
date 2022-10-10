const express = require('express');
const router = express.Router();

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

module.exports = router;
