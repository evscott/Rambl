const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const verifier = require('../shared/verifyPermissions');
const tripHandler = require('../handlers/tripHandler');

// All the routes for trips
router.get('/get', middleware.checkToken, tripHandler.getTrips);
router.get('/get/:trip_id', middleware.checkToken, tripHandler.getTrip);
router.post('/add', middleware.checkToken, tripHandler.addTrip);
router.put(
  '/update',
  middleware.checkToken,
  verifier.canEditTrip,
  tripHandler.updateTrip
);
router.delete(
  '/delete',
  middleware.checkToken,
  verifier.canEditTrip,
  tripHandler.deleteTrip
);

module.exports = router;
