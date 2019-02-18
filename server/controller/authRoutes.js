const express = require('express');
const router = express.Router();
const handler = require('../handlers/authHandler');

// Basic routes for authentication
router.post('/signup', handler.signup);
router.post('/login', handler.login);

// Export routes
module.exports = router;
