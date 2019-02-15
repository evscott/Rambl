const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const planHandler = require('../handlers/planHandler');

// All the routes for trips
router.get('/', middleware.checkToken, planHandler.getPlans);
router.post('/', middleware.checkToken, planHandler.addPlan);
router.put('/', middleware.checkToken, planHandler.updatePlan);
router.delete('/', middleware.checkToken, planHandler.deletePlan);

module.exports = router;
