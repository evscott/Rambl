const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const tripHandler = require('../handlers/tripHandler');

// All the routes for trips
router.get('/get', middleware.checkToken, tripHandler.getTrips);
router.post('/add', middleware.checkToken, tripHandler.addTrip);
router.put('/update/:tid', middleware.checkToken, tripHandler.updateTrip);
router.delete('/delete/:tid', middleware.checkToken, tripHandler.deleteTrip);

module.exports = router;
