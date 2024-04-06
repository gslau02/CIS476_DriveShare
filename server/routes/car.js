const express = require('express');
const router = express.Router();
const { listCarForRent } = require('../controllers/carController');
const { listUserCarListings } = require('../controllers/carController');
const { updateCarListing } = require('../controllers/carController');
const { getCarDetails } = require('../controllers/carController');
const { deleteCarListing } = require('../controllers/carController');

router.post('/listCarForRent', listCarForRent);
router.get('/listUserCarListings/:userId', listUserCarListings);
router.put('/:carId', updateCarListing);
router.get('/:carId', getCarDetails);
router.delete('/:carId', deleteCarListing);

module.exports = router;