const jwt = require('jsonwebtoken');
const Config = require('../Config');

/**
 * Decodes a json web token to extract user email.
 * @param token to be decoded
 * @returns {*} email extracted from json web token.
 */
let decodeToken = (token) => {
  return jwt.verify(
    token,
    Config.publicKey,
    Config.verifyOptions,
    (err, decoded) => {
      if (err) return err;
      else {
        return decoded.email;
      }
    }
  );
};

module.exports = decodeToken;
