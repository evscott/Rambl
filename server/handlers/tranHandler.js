
const databaseHandler = require('./databaseHandler');
const jwtDecoder = require('../shared/jwtDecoder');

/**
 * Gets the information for all transportation and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getTransportations = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT *
                  FROM transportation
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
    'Get all transportation'
  );
};

/**
 * Gets the information for a specific transportation and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getTransportation = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT *
                  FROM transportation
                  WHERE e_id = ? AND trip_id IN
                    (SELECT trip_id FROM trips
                    WHERE user_id =
                      (SELECT user_id FROM users
                      WHERE email = ?))`;
  const params = [req.body.e_id, email];
  return databaseHandler.queryDatabase(
    res,
    query,
    params,
    'Get a transportation'
  );
};

/**
 * Adds a new transportation to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addTransportation = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO transportation (trip_id, cost, begin_time, 
                  end_time, loc, loc_end, dscript, completed, priority, method)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    req.body.trip_id,
    req.body.cost,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.loc_end,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.method
  ];

  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Add transportation'
  );
};

/**
 * Updates a pre-existing transportation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateTransportation = async (req, res) => {
  const query = `UPDATE transportation 
                  SET cost=?, begin_time=?, end_time=?, loc=?, loc_end=?, 
                  dscript=?, completed=?, priority=?, method=?
                  WHERE trip_id=? AND e_id=?`;
  const params = [
    req.body.cost,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.loc_end,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.method,
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
 * Deletes a pre-existing transportation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteTransportation = async (req, res) => {
  const query = `DELETE FROM transportation WHERE trip_id = ? AND e_id=?`;
  const params = [req.body.trip_id, req.body.e_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete transportation'
  );
};

module.exports = {
  getTransportations: getTransportations,
  getTransportation: getTransportation,
  addTransportation: addTransportation,
  updateTransportation: updateTransportation,
  deleteTransportation: deleteTransportation
};
