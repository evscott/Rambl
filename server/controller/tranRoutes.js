const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const tranHandler = require('../handlers/tranHandler');

// All the routes for transportation
router.get('/get', middleware.checkToken, tranHandler.getTransportations);
router.post('/add', middleware.checkToken, tranHandler.addTransportation);
router.put('/update', middleware.checkToken, tranHandler.updateTransportation);
router.delete('/delete', middleware.checkToken, tranHandler.deleteTransportation);

module.exports = router;
