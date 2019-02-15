const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const tranHandler = require('../handlers/tranHandler');

// All the routes for transportation
router.get('/get', middleware.checkToken, tranHandler.getTrans);
router.post('/add', middleware.checkToken, tranHandler.addTran);
router.put('/update', middleware.checkToken, tranHandler.updateTran);
router.delete('/delete', middleware.checkToken, tranHandler.deleteTran);

module.exports = router;
