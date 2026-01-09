const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { authController } = require('../controller/authController');

router.get('/', auth, authController);

module.exports = router;