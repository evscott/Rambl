const express = require('express');
const router = express.Router();
const middleware = require('../shared/middleware');
const planHandler = require('../handlers/planHandler');

// All the routes for plans
router.get('/get', middleware.checkToken, planHandler.getPlans);
router.post('/add', middleware.checkToken, planHandler.addPlan);
router.put('/update', middleware.checkToken, planHandler.updatePlan);
router.delete('/delete', middleware.checkToken, planHandler.deletePlan);

module.exports = router;
