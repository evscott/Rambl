const express = require('express');
const router = express.Router();
const middleware = require('../handlers/middleware');
const userHandler = require('../handlers/userHandler');
const tripHandler = require('../handlers/tripHandler');

// Get the information pertaining to a user
router.get('/user', middleware.checkToken, userHandler.getUserInfo);

// All the routes for trips
router.get('/trips', middleware.checkToken, tripHandler.getTrips);
router.post('/trips', middleware.checkToken, tripHandler.addTrip);
router.put('/trips/:tname', middleware.checkToken, tripHandler.updateTrip);
router.delete('/trips/:tname', middleware.checkToken, tripHandler.deleteTrip);

module.exports = router;
