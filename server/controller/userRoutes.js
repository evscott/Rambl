const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const userHandler = require('../handlers/userHandler');

// Basic routes for user
router.put('/update', middleware.checkToken, userHandler.updateUserInfo);
router.get('/getinfo', middleware.checkToken, userHandler.getInfo);

// Export routes
module.exports = router;
