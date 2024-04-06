const express = require('express');
const router = express.Router();
const { listCarForRent, fetchAllCars, fetchSingleCar } = require('../controllers/carController');

router.post('/listCarForRent', listCarForRent);
router.get('/fetchAllCars', fetchAllCars);
router.get('/:id', fetchSingleCar);

module.exports = router;