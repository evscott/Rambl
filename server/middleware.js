const jwt = require('jsonwebtoken');
const Config = require('./Config');

let checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    // Remove Bearer from string if detected
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
    // Determine if jwt token is legit
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
          req.decoded = decoded;
          // TODO authentication of decoded username/password

          next();
        }
      }
    );
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
};
