const jwt = require('jsonwebtoken');
const Config = require('../Config');

let decodeToken = (token) => {
  return jwt.verify(
    token,
    Config.publicKey,
    Config.verifyOptions,
    (err, decoded) => {
      if (err) return err;
      else {
        return decoded.email
      };
    }
  );
};

module.exports = decodeToken;