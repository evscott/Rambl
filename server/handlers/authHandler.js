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
          message: 'Sign up unsuccessful.',
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
