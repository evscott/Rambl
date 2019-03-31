const jwtDecoder = require('./jwtDecoder');
const databaseHandler = require('../handlers/databaseHandler');

/**
 * This middleware checks if a user's token is valid for modifying a specific
 * trip id.
 * @param req containing json web token in header and the request information.
 * @param res json object indicating failure if encountered.
 * @param next the function to call to move to the next function after
 * the middleware.
 * @returns {Promise<*>}
 */
let canEditTrip = async (req, res, next) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  let params = [email, req.body.trip_id];
  const query = `SELECT user_id FROM users
                WHERE email=? AND user_id=
                  (SELECT user_id FROM trips
                  WHERE trip_id=?)`;
  try {
    console.log('Trying to see permissions');
    databaseHandler.queryDatabaseSilent(query, params).then((success) => {
      console.log('Found permissions');
      console.log(success);
      if (success.length > 0) {
        next();
      } else {
        return res.json({
          success: false,
          message:
            'Token is not valid to edit the specified trip. This may be because the item does not exist in the database, or because the user does not have permission to edit the trip.'
        });
      }
    });
  } catch {
    return res.json({
      success: false,
      message: 'There were problems authorizing the edit to the specified trip.'
    });
  }
};

module.exports = {
  canEditTrip: canEditTrip
};
