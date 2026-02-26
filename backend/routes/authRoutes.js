const express = require('express');
const router = express.Router();
const { signup, forgotPassword, resetPassword, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// ADDED LOGIN ROUTE
router.post('/login', login);

module.exports = router;