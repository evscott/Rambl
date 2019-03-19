const jwt = require('jsonwebtoken');
const Config = require('../Config');

/**
 * Checks whether user token is present and is valid.
 * @param request containing json web token in header.
 * @param response json object indicating failure if encountered.
 * @param next if token is present and valid.
 * @returns {*} json response object if token not found or invalid.
 */
let checkToken = (request, response, next) => {
  let token = request.headers['x-access-token'];
  if (token) {
    jwt.verify(token, Config.publicKey, Config.verifyOptions, (err) => {
      if (err) {
        return response.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        next();
      }
    });
  } else {
    return response.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
};
