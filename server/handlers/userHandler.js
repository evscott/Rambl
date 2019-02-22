const db = require('../model/database');
const jwt = require('jsonwebtoken');
const databaseHandler = require('./databaseHandler');
const Config = require('../Config');

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
  let email;
  jwt.verify(
    token,
    Config.publicKey,
    Config.verifyOptions,
    (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        email = decoded.email;
        const params = [email = decoded.email];
        const query = `SELECT * FROM users WHERE email = ?;`;
        return databaseHandler.queryDatabase(res, query, params, 'Get user info');
      }
    }
  );
};

module.exports = {
  getInfo: getInfo
};
