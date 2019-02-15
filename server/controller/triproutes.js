const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const tripHandler = require('../handlers/tripHandler');

// All the routes for trips
router.get('/', middleware.checkToken, tripHandler.getTrips);
router.post('/', middleware.checkToken, tripHandler.addTrip);
router.put('/', middleware.checkToken, tripHandler.updateTrip);
router.delete('/', middleware.checkToken, tripHandler.deleteTrip);

module.exports = router;
