const express = require('express');
const router = express.Router();
const { listCarForRent } = require('../controllers/carController');

router.post('/listCarForRent', listCarForRent);

module.exports = router;