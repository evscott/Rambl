const databaseHandler = require('./databaseHandler');
const jwtDecoder = require('../shared/jwtDecoder');

/**
 * Updates the user info in the database.
 * @param req the request
 * @param res the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateUserInfo = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const params = [req.body.f_name, req.body.l_name, email];
  const query = `UPDATE users
                 SET f_name = ?, l_name = ?
                 WHERE email = ?;`;
  return databaseHandler.queryDatabase(res, query, params, 'Update user info');
};

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
let getInfo = async (req, res) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  const params = [email];
  const query = `SELECT * FROM users WHERE email = ?;`;
  return databaseHandler.queryDatabase(res, query, params, 'Get user info');
};

module.exports = {
  updateUserInfo: updateUserInfo,
  getInfo: getInfo
};
