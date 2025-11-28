const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPasswordWithOtp } = require('../controllers/authController');
const { redirectToGoogle, handleGoogleCallback } = require('../controllers/googleAuthController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword-otp', resetPasswordWithOtp); 

router.get('/google', redirectToGoogle);
router.get('/google/callback', handleGoogleCallback);

module.exports = router;