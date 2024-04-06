const express = require('express');
const router = express.Router();
const { listCarForRent } = require('../controllers/carController');
const { listUserCarListings } = require('../controllers/carController');
const { updateCarListing } = require('../controllers/carController');
const { getCarDetails } = require('../controllers/carController');
const { deleteCarListing } = require('../controllers/carController');
const { fetchAllCars } = require('../controllers/carController');

router.post('/listCarForRent', listCarForRent);
router.get('/listUserCarListings/:userId', listUserCarListings);
router.put('/:carId', updateCarListing);
router.get('/:carId', getCarDetails);
router.delete('/:carId', deleteCarListing);


router.post('/listCarForRent', listCarForRent);
router.get('/fetchAllCars', fetchAllCars);
//router.get('/:id', fetchSingleCar);

module.exports = router;