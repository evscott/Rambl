const databaseHandler = require('./databaseHandler');
const jwtDecoder = require('../shared/jwtDecoder');

/**
 * Gets the information for all accommodations and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getAccoms = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT *
                FROM accoms
                WHERE trip_id IN
                  (SELECT trip_id FROM trips
                  WHERE user_id =
                    (SELECT user_id FROM users
                    WHERE email = ?))`;
  const params = [email];
  return databaseHandler.queryDatabase(
    res,
    query,
    params,
    'Get all accommodations'
  );
};

/**
 * Gets the information for a specific accommodations and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getAccom = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT *
                FROM accoms
                WHERE trip_id IN
                  (SELECT trip_id FROM trips
                  WHERE e_id = ? AND user_id =
                    (SELECT user_id FROM users
                    WHERE email = ?))`;
  const params = [req.body.e_id, email];
  return databaseHandler.queryDatabase(
    res,
    query,
    params,
    'Get a accommodation'
  );
};

/**
 * Adds a new accommodation to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addAccom = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO accoms (trip_id, cost, check_in, begin_time, 
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

  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Add accommodation'
  );
};

/**
 * Updates a pre-existing accommodation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateAccom = async (req, res) => {
  const query = `UPDATE accoms 
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
    'Update accommodation'
  );
};

/**
 * Deletes a pre-existing accommodation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteAccom = async (req, res) => {
  const query = `DELETE FROM accoms WHERE trip_id = ? AND e_id=?`;
  const params = [req.body.trip_id, req.body.e_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete accommodation'
  );
};

module.exports = {
  getAccoms: getAccoms,
  getAccom: getAccom,
  addAccom: addAccom,
  updateAccom: updateAccom,
  deleteAccom: deleteAccom
};