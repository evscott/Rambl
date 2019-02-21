const databaseHandler = require('./databaseHandler');

/**
 * Gets the information for all plans and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getPlans = async (req, res) => {
  const query = `SELECT *
                  FROM plans
                  WHERE trip_id IN
                    (SELECT trip_id FROM trips
                    WHERE user_id = ?)`;
  const params = [req.body.user_id];
  return databaseHandler.queryDatabase(res, query, params, 'Get plans');
};

/**
 * Adds a new plan to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addPlan = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO plans (trip_id, cost, check_in, begin_time, 
                  end_time, loc, dscript, completed, priority)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    req.body.trip_id,
    req.body.cost,
    req.body.check_in,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.dscript,
    req.body.completed,
    req.body.priority
  ];

  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Add plan');
};

/**
 * Updates a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updatePlan = async (req, res) => {
  const query = `UPDATE plans 
                  SET cost=?, check_in=?, begin_time=?, end_time=?, loc=?, 
                  dscript=?, completed=?, priority=?
                  WHERE trip_id=? AND e_id=?;`;
  const params = [
    req.body.cost,
    req.body.check_in,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.trip_id,
    req.body.e_id
  ];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Update plan'
  );
};

/**
 * Deletes a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deletePlan = async (req, res) => {
  const query = `DELETE FROM plans WHERE trip_id = ? AND e_id=?`;
  const params = [req.body.trip_id, req.body.e_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete plan'
  );
};

module.exports = {
  getPlans: getPlans,
  addPlan: addPlan,
  updatePlan: updatePlan,
  deletePlan: deletePlan
};