const express = require('express');
const router = express.Router();
const { register, auth } = require('../controllers/authController');

router.post('/register', register);
router.post('/auth', auth);

module.exports = router;
