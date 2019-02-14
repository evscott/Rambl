const db = require('../model/database');
const pool = db.getPool();
const databaseHandler = require('./databaseHandler');

/**
 * Gets the information for all trips and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getTrips = async (req, res) => {
  const email = pool.escape(req.body.email); // Get email from body
  const query = `SELECT user_id, trip_id, name, dscript
                  FROM trips
                  WHERE user_id =
                    (SELECT user_id FROM users
                    WHERE email = ${email});`;
  return databaseHandler.queryDatabase(res, query, 'Get trips');
};

/**
 * Adds a new trip to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addTrip = async (req, res) => {
  const email = pool.escape(req.body.email); // Get email from body
  const tripName = pool.escape(req.body.name); // Get trip's name from body
  const description = pool.escape(req.body.dscript); // Get trip's description from body
  const query = `INSERT INTO trips (user_id, name, dscript)
                  VALUES (
                    (SELECT user_id FROM users
                    WHERE email = ${email}),
                    ${tripName},
                    ${description}
                  )`;
  return databaseHandler.queryDatabaseBoolean(res, query, 'Add trip');
};

/**
 * Updates a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateTrip = async (req, res) => {
  const tripName = pool.escape(req.body.name); // Get trip's name from body
  const description = pool.escape(req.body.dscript); // Get trip's description from body
  const tripId = req.params['tid'];
  const query = `UPDATE trips
                  SET dscript = ${description}, name = ${tripName}
                  WHERE trip_id = ${tripId}`;
  return databaseHandler.queryDatabaseBoolean(res, query, 'Update trip');
};

/**
 * Deletes a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteTrip = async (req, res) => {
  const email = pool.escape(req.body.email); // Get username from body
  const tripId = req.params['tid'];
  const query = `DELETE FROM trips WHERE trip_id = ${tripId}`;
  return databaseHandler.queryDatabaseBoolean(res, query, 'Delete trip');
};

module.exports = {
  getTrips: getTrips,
  addTrip: addTrip,
  updateTrip: updateTrip,
  deleteTrip: deleteTrip
};
