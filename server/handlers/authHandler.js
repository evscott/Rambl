require('dotenv').config();
const jwt = require('jsonwebtoken');
const Config = require('../shared/Config');
const databaseHandler = require('./databaseHandler');

/**
 * Signs a user up using their email, password, first name, and last name.
 * @param req the request.
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let signup = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let fName = req.body.f_name;
  let lName = req.body.l_name;

  // Attempt signup with unique username, return success notification.
  try {
    databaseHandler.signup(email, password, fName, lName).then(success => {
      if (success === false) {
        // Signup unsuccessful - username potentially already taken.
        res.json({
          success: false,
          message: 'Sign up unsuccessful. Username or password already taken.',
          token: null
        });
      } else {
        let token = jwt.sign(
          { email: email },
          Config.privateKey,
          Config.signOptions
        );

        // Signup success.
        res.json({
          success: true,
          message: 'Sign up successful!',
          token: token
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

/**
 * Logs a user in using their email and password.
 * @param req the request
 * @param res the response
 * @returns {Promise<void>} the promise indicating success
 */
let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // Check if username and password exist, return success notification
  try {
    databaseHandler.login(email, password).then(success => {
      if (success === false) {
        // Credential authentication failure.
        res.json({
          success: false,
          message: 'Incorrect username or password.',
          token: null
        });
      } else {
        // Retrieve json web token
        let token = jwt.sign(
          { email: email, password: password },
          Config.privateKey,
          Config.signOptions
        );

        // Login success.
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
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

module.exports = {
  signup: signup,
  login: login
};
