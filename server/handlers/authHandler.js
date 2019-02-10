require('dotenv').config();
const jwt = require('jsonwebtoken');
const Config = require('../Config');
const databaseHandler = require('./databaseHandler');

// Query database handler with signup request.
let signup = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // Attempt signup with unique username, return success notification.
  try {
    databaseHandler.signup(username, password).then(success => {
      if (success) {
        // Retrieve json web token

        console.log("PRIVATE KEY ", Config.privateKey);

        let token = jwt.sign(
          { username: username, password: password },
          Config.privateKey,
          Config.signOptions
        );

        // Signup success.
        res.json({
          success: true,
          message: 'Sign up successful!',
          token: token
        });
      } else {
        // Signup unsuccessful - username potentially already taken.
        res.json({
          success: false,
          message: 'Sign up unsuccessful. Username or password already taken.',
          token: null
        });
      }
    });
  } catch (err) {
    // Ambiguous failure - potentially fatal error.
    console.err(err);
    res.json({
      success: false,
      message: 'Sign up unsuccessful. This may be network related.',
      token: null
    });
  }
};

// Query database handler with login request
let login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // Check if username and password exist, return success notification
  try {
    databaseHandler.login(username, password).then(success => {
      if (username && password) {
        if (success) {
          // Retrieve json web token
          let token = jwt.sign(
            { username: username, password: password },
            Config.privateKey,
            Config.signOptions
          );

          // Login success.
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          // Credential authentication failure.
          res.json({
            success: false,
            message: 'Incorrect username or password.',
            token: null
          });
        }
      } else {
        // Ambiguous authentication failure.
        res.json({
          success: false,
          message: 'Authentication failed! Please check the request.',
          token: null
        });
      }
    });
  } catch (err) {
    // Ambiguous failure - potentially fatal error.
    console.err(err);
    res.json({
      success: false,
      message: 'Authentication unsuccessful. This may be network related.'
    });
  }
};

let index = (req, res) => {
  res.json({
    success: true,
    message: 'Index page'
  });
};

module.exports = {
  login: login,
  signup: signup,
  index: index
};
