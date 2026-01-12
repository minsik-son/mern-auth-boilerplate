const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { registerUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controller/userController');


// User  Route
router.post('/register', registerUser);
router.patch('/', auth, updateUser);
router.delete('/', auth, deleteUser);
router.post('/login', loginUser)
router.get('/logout', auth, logoutUser);


module.exports = router;