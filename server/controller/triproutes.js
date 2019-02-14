const express = require('express');
const router = express.Router();
const middleware = require('../handlers/middleware');
const tripHandler = require('../handlers/tripHandler');

// All the routes for trips
router.put('/:tid', middleware.checkToken, tripHandler.updateTrip);
router.delete('/:tid', middleware.checkToken, tripHandler.deleteTrip);
router.get('/', middleware.checkToken, tripHandler.getTrips);
router.post('/', middleware.checkToken, tripHandler.addTrip);

module.exports = router;
