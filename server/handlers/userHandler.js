const db = require('../model/database');
const pool = db.getPool();
const databaseHandler = require('./databaseHandler');

/**
 * Gets the user info from the database and gives
 * it back to the user using the res object. Note that
 * the user info is found in an array within the "result"
 * key of the JSON, and there is just one element in that
 * array.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getUserInfo = async (req, res) => {
  const username = pool.escape(req.body.username); // Get username from body
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query
  return databaseHandler.queryDatabase(res, query, 'Get user info');
};

module.exports = {
  getUserInfo: getUserInfo
};
