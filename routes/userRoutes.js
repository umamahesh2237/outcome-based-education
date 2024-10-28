const express = require('express');
const { signUp, login, getUserProfile, addRegulation } = require('../controllers/userController');
const router = express.Router();

// Route for user signup
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);

// Route to add a regulation
router.post('/AddRegulations', addRegulation);

// Route to get user profile (NEW ROUTE)
router.get('/profile', getUserProfile);

module.exports = router;