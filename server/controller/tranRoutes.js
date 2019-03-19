const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const tranHandler = require('../handlers/tranHandler');
const verifier = require('../shared/verifyPermissions');

// All the routes for transportation
router.get('/get', middleware.checkToken, tranHandler.getTransportations);
router.get('/get/:e_id', middleware.checkToken, tranHandler.getTransportation);
router.post(
  '/add',
  middleware.checkToken,
  verifier.canEditTrip,
  tranHandler.addTransportation
);
router.put(
  '/update',
  middleware.checkToken,
  verifier.canEditTrip,
  tranHandler.updateTransportation
);
router.delete(
  '/delete',
  middleware.checkToken,
  verifier.canEditTrip,
  tranHandler.deleteTransportation
);

module.exports = router;
