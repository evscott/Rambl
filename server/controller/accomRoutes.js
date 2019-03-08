const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const verifier = require('../shared/verifyPermissions');
const accomHandler = require('../handlers/accomHandler');

// All the routes for accommodations
router.get('/get', middleware.checkToken, accomHandler.getAccoms);
router.get('/get/:e_id', middleware.checkToken, accomHandler.getAccom);
router.post(
  '/add',
  middleware.checkToken,
  verifier.canEditTrip,
  accomHandler.addAccom
);
router.put(
  '/update',
  middleware.checkToken,
  verifier.canEditTrip,
  accomHandler.updateAccom
);
router.delete(
  '/delete',
  middleware.checkToken,
  verifier.canEditTrip,
  accomHandler.deleteAccom
);

module.exports = router;
