const express = require('express');
const router = express.Router();
const middleware = require('../handlers/middleware');
const userHandler = require('../handlers/userHandler');

// Get the information pertaining to a user
router.get('/user', middleware.checkToken, userHandler.getUserInfo);

module.exports = router;
