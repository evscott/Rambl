const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const handler = require('../handlers/userHandler');

// Basic routes for user
router.get('/getinfo', middleware.checkToken, handler.getInfo);

// Export routes
module.exports = router;
