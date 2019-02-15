const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const planHandler = require('../handlers/planHandler');

// All the routes for trips
router.get('/get', middleware.checkToken, planHandler.getPlans);
router.post('/add', middleware.checkToken, planHandler.addPlan);
router.put('/update/:tid', middleware.checkToken, planHandler.updatePlan);
router.delete('/delete/:tid', middleware.checkToken, planHandler.deletePlan);

module.exports = router;
