const express = require('express');
const router = express.Router();
const { analyzeGmail } = require('../controllers/gmailController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected, meaning only a logged-in user can access it.
router.post('/analyze', protect, analyzeGmail);

module.exports = router;