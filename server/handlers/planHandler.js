const databaseHandler = require('./databaseHandler');
const jwtDecoder = require('../shared/jwtDecoder');

/**
 * Gets the information for all plans and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getPlans = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const params = [email];
  const query = `SELECT *
                  FROM plans
                  WHERE trip_id IN
                    (SELECT trip_id FROM trips
                    WHERE user_id =
                      (SELECT user_id FROM users
                      WHERE email = ?))`;

  return databaseHandler.queryDatabase(res, query, params, 'Get all plans');
};

/**
 * Gets the information for a specific plan and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getPlan = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT *
                 FROM plans
                 WHERE e_id = ? AND trip_id IN
                       (SELECT trip_id FROM trips
                        WHERE user_id =
                              (SELECT user_id FROM users
                               WHERE email = ?))`;
  const params = [req.body.e_id, email];
  return databaseHandler.queryDatabase(res, query, params, 'Get a plan');
};

/**
 * Adds a new plan to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addPlan = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO plans (trip_id, cost, begin_time, 
                  end_time, loc, dscript, completed, priority)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    req.body.trip_id,
    req.body.cost,
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
                  SET cost=?, begin_time=?, end_time=?, loc=?, 
                  dscript=?, completed=?, priority=?
                  WHERE trip_id=? AND e_id=?`;
  const params = [
    req.body.cost,
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
  getPlan: getPlan,
  addPlan: addPlan,
  updatePlan: updatePlan,
  deletePlan: deletePlan
};
