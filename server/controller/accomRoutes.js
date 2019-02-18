const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const accomHandler = require('../handlers/accomHandler');

// All the routes for accommodations
router.get('/get', middleware.checkToken, accomHandler.getAccoms);
router.post('/add', middleware.checkToken, accomHandler.addAccom);
router.put('/update', middleware.checkToken, accomHandler.updateAccom);
router.delete('/delete', middleware.checkToken, accomHandler.deleteAccom);

module.exports = router;
