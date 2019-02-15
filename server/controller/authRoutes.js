const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const handler = require('../handlers/authHandler');

// Basic routes
router.post('/signup', handler.signup);
router.post('/login', handler.login);
router.get('/', middleware.checkToken, handler.index);

// Export routes
module.exports = router;
