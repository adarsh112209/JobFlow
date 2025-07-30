const express = require('express');
const router = express.Router();
const { 
    getUserProfile, 
    updateUserProfile, 
    changePassword, 
    updateUserSettings 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Routes for general profile info
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// New route for changing password
router.put('/profile/change-password', protect, changePassword);

// New route for settings
router.put('/profile/settings', protect, updateUserSettings);

module.exports = router;