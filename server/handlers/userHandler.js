const db = require('../model/database');
const pool = db.getPool();

// Get user info handler
let getUserInfo = async (req, res) => {
  const username = pool.escape(req.body.username); // Get username from url
  const query = `SELECT * FROM person WHERE username = ${username};`; // TODO: add the query

  try {
    pool.query(query, (err, queryres) => {
      // If failure accessing db, failure
      if (err) {
        res.json({
          success: false,
          message: 'Get user info failed. Database failure.',
          result: {}
        });
      }
      // If no entry in database, failure
      else if (queryres.length == 0) {
        res.json({
          success: false,
          message:
            'Get user info failed. Username was not found in the database, despite the token being valid.',
          result: {}
        });
      }
      // If found, success
      else {
        res.json({
          success: true,
          message: 'Get user info successful!',
          result: queryres[0]
        });
      }
    });
  } catch (err) {
    // Ambiguous failure
    console.err(err);
    res.json({
      success: false,
      message: 'Get user info unsuccessful. This may be network related.'
    });
  }
};

module.exports = {
  getUserInfo: getUserInfo
};
