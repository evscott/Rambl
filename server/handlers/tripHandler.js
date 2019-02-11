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
  const username = pool.escape(req.body.username); // Get username from body
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query
  return databaseHandler.queryDatabase(res, query, 'Get trips');
};

/**
 * Adds a new trip to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addTrip = async (req, res) => {
  const username = pool.escape(req.body.username); // Get username from body
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query
  return databaseHandler.queryDatabaseBoolean(res, query, 'Add trip');
};

/**
 * Updates a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateTrip = async (req, res) => {
  const username = pool.escape(req.body.username); // Get username from body
  const requestedTrip = req.params['tname'];
  console.log(requestedTrip); // TODO: remove this
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query
  return databaseHandler.queryDatabaseBoolean(res, query, 'Update trip');
};

/**
 * Deletes a pre-existing trip from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteTrip = async (req, res) => {
  const username = pool.escape(req.body.username); // Get username from body
  const requestedTrip = req.params['tname'];
  console.log(requestedTrip); // TODO: remove this
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query
  return databaseHandler.queryDatabaseBoolean(res, query, 'Delete trip');
};

module.exports = {
  getTrips: getTrips,
  addTrip: addTrip,
  updateTrip: updateTrip,
  deleteTrip: deleteTrip
};
