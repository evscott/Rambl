const databaseHandler = require('./databaseHandler');
const jwtDecoder = require('../shared/jwtDecoder');

/**
 * Gets the information for all trips and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getTrips = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const query = `SELECT user_id, trip_id, name, dscript
                  FROM trips
                  WHERE user_id =
                    (SELECT user_id FROM users
                    WHERE email = ?)`;
  const params = [email];
  return databaseHandler.queryDatabase(res, query, params, 'Get trips');
};

/**
 * Adds a new trip to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addTrip = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  console.log(req.body);
  const query = `INSERT INTO trips (user_id, name, dscript)
                  VALUES (
                    (SELECT MAX(user_id) 
                     FROM users
                     WHERE email = ?), ?, ?
                    )`;
  const params = [email, req.body.name, req.body.dscript];
  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Add trip');
};

/**
 * Updates a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateTrip = async (req, res) => {
  const query = `UPDATE trips
                  SET name = ?, dscript = ?
                  WHERE trip_id = ?`;
  const params = [req.body.name, req.body.dscript, req.body.trip_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Update trip'
  );
};

/**
 * Deletes a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteTrip = async (req, res) => {
  const query = `DELETE FROM trips WHERE trip_id = ?`;
  const params = [req.body.trip_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete trip'
  );
};

module.exports = {
  getTrips: getTrips,
  addTrip: addTrip,
  updateTrip: updateTrip,
  deleteTrip: deleteTrip
};
