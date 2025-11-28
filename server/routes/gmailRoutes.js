const express = require('express');
const router = express.Router();
const { analyzeGmail } = require('../controllers/gmailController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeGmail);

module.exports = router;