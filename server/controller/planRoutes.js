const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const planHandler = require('../handlers/planHandler');
const verifier = require('../shared/verifyPermissions');

// All the routes for plans
router.get('/get', middleware.checkToken, planHandler.getPlans);
router.get('/get/:e_id', middleware.checkToken, planHandler.getPlan);
router.post('/add', middleware.checkToken, verifier.canEditTrip, planHandler.addPlan);
router.put('/update', middleware.checkToken, verifier.canEditTrip, planHandler.updatePlan);
router.delete('/delete', middleware.checkToken, verifier.canEditTrip, planHandler.deletePlan);

module.exports = router;