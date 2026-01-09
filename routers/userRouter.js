const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { registerUser, loginUser, logoutUser } = require('../controller/userController');


// User  Route
router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', auth, logoutUser);


module.exports = router;