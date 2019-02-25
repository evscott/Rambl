const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const accomHandler = require('../handlers/accomHandler');
const verifier = require('../shared/verifyPermissions');

// All the routes for accommodations
router.get('/get', middleware.checkToken, accomHandler.getAccoms);
router.post('/get', middleware.checkToken, accomHandler.getAccom);
// Note that the verifier checks if the trip is editable here, so we can edit a transportation
router.post('/add', middleware.checkToken, verifier.canEditTrip, accomHandler.addAccom);
router.put('/update', middleware.checkToken, verifier.canEditTrip, accomHandler.updateAccom);
router.delete('/delete', middleware.checkToken, verifier.canEditTrip, accomHandler.deleteAccom);

module.exports = router;
