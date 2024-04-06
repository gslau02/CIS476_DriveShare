const express = require('express');
const router = express.Router();
const { listCarForRent, fetchAllCars } = require('../controllers/carController');

router.post('/listCarForRent', listCarForRent);
router.get('/fetchAllCars', fetchAllCars);

module.exports = router;