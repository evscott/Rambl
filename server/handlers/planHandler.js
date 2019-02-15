const databaseHandler = require('./databaseHandler');

/**
 * Gets the information for all trips and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getPlans = async (req, res) => {
  const query = `SELECT user_id, trip_id, name, dscript
                  FROM trips
                  WHERE user_id =
                    (SELECT user_id FROM users
                    WHERE email = ?)`;
  const params = [req.body.email];
  return databaseHandler.queryDatabase(res, query, params, 'Get plans');
};

/**
 * Adds a new plan to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addPlan = async (req, res) => {
  const query = `INSERT INTO trips (user_id, name, dscript)
                  VALUES (
                    (SELECT user_id FROM users
                    WHERE email = ?), ?, ?
                  )`;
  const params = [req.body.email, req.body.name, req.body.dscript];
  return databaseHandler.queryDatabaseBoolean(res, query, params,'Add plan');
};

/**
 * Updates a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updatePlan = async (req, res) => {
  const query = `UPDATE trips
                  SET name = ?, dscript = ?
                  WHERE trip_id = ?`;
  const params = [req.body.name, req.body.dscript, req.params['tid']];
  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Update plan');
};

/**
 * Deletes a pre-existing plan from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deletePlan = async (req, res) => {
  const query = `DELETE FROM trips WHERE trip_id = ?`;
  const params = [req.params['tid']];
  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Delete plan');
};

module.exports = {
  getPlans: getPlans,
  addPlan: addPlan,
  updatePlan: updatePlan,
  deletePlan: deletePlan
};
