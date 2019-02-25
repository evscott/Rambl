const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const planHandler = require('../handlers/planHandler');
const verifier = require('../shared/verifyPermissions');

// All the routes for plans
router.get('/get', middleware.checkToken, planHandler.getPlans);
router.post('/get', middleware.checkToken, planHandler.getPlan);
// Note that the verifier checks if the TRIP is editable here, so we can add a plan
router.post('/add', middleware.checkToken, verifier.canEditTrip, planHandler.addPlan);
router.put('/update', middleware.checkToken, verifier.canEditTrip, planHandler.updatePlan);
router.delete('/delete', middleware.checkToken, verifier.canEditTrip, planHandler.deletePlan);

module.exports = router;
