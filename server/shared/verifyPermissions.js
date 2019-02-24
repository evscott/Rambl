const jwtDecoder = require('./jwtDecoder');
const databaseHandler = require('../handlers/databaseHandler');

let canEdit = async (req, res, query, params, next, idType) => {
  try {
    databaseHandler.queryDatabaseSilent(query, params).then(success => {
      console.log(success);
      if (success.length > 0) {
        next();
      } else {
        return res.json({
          success: false,
          message: 'Token is not valid to edit the specified ' + idType + ". This may be because the item does not exist in the database."
        });
      }
    });
  } catch {
    return res.json({
      success: false,
      message: 'There were problems authorizing the edit to the specified ' + idType
    });
  }
};

/**
 * This middleware checks if a user's token is valid for modifying a specific
 * trip id.
 * @param req containing json web token in header.
 * @param res json object indicating failure if encountered.
 * @param next
 * @returns {Promise<void>}
 */
let canEditTrip = async (req, res, next) => {
  let token = req.headers['x-access-token'];
  let email = jwtDecoder(token);
  let params = [email, req.body.trip_id];
  const query = `SELECT user_id FROM users
                WHERE email=? AND user_id=
                  (SELECT user_id FROM trips
                  WHERE trip_id=?)`;
  return canEdit(req, res, query, params, next, "trip id");
};

module.exports = {
  canEditTrip: canEditTrip
};
