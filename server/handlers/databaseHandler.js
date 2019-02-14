const db = require('../model/database');
const pool = db.getPool();

// Sign up handler. Query database with signup request
let signup = async (email, password, fName, lName) => {
  let signupQuery = `INSERT IGNORE INTO users (email, password, f_name, l_name) VALUES ("${email}", "${password}", "${fName}", "${lName}")`;
  return new Promise((resolve, reject) => {
    pool.query(signupQuery, (err, res) => {
      if (err) reject(err);
      else if (res.affectedRows > 0) resolve(true);
      else resolve(false);
    });
  });
};

// Sign in handler. Query database with login request
let login = async (email, password) => {
  let loginQuery = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;
  return new Promise((resolve, reject) => {
    pool.query(loginQuery, (err, res) => {
      if (err) reject(err);
      else if (res.length > 0) resolve(true);
      else resolve(false);
    });
  });
};

/**
 * Generic database query handler. It automatically adds the
 * results of the query to the res object.
 * @param res object allowing sending json back to the user
 * which is making the request to the Node server
 * @param query the SQL query
 * @param operationString the string representing the operation
 * being performed, which is used for explaining what results of
 * the operation are.
 * @returns {Promise<void>} the promise indicating success/failure
 */
let queryDatabase = async (res, query, operationString) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, (err, sqlRes) => {
        if (err) {
          // If failure accessing db, failure
          res.json({
            success: false,
            message: operationString + ' failed. Database failure.',
            result: {}
          });
          reject(err);
        } else if (sqlRes.length > 0) {
          // If found, success
          res.json({
            success: true,
            message: operationString + ' successful!',
            result: sqlRes
          });
          resolve(true);
        } else {
          // If no entry in db, failure
          res.json({
            success: false,
            message:
              operationString +
              ' failed. The desired data was not found in the database.',
            result: {}
          });
          resolve(false);
        }
      });
    } catch (err) {
      // Ambiguous failure
      console.err(err);
      res.json({
        success: false,
        message:
          operationString + ' unsuccessful. This may be network related.',
        result: {}
      });
    }
  });
};

/**
 * Generic database query handler. It does not append any results
 * to the res object; instead, it states whether the operation
 * was successful or not.
 * @param res object allowing sending json back to the user
 * which is making the request to the Node server
 * @param query the SQL query
 * @param operationString the string representing the operation
 * being performed, which is used for explaining what results of
 * the operation are.
 * @returns {Promise<void>} the promise indicating success/failure
 */
let queryDatabaseBoolean = async (res, query, operationString) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, (err, sqlRes) => {
        if (err) {
          // If failure accessing db, failure
          res.json({
            success: false,
            message: operationString + ' failed. Database failure.'
          });
          reject(err);
        } else if (sqlRes.affectedRows > 0) {
          // If found, success
          res.json({
            success: true,
            message: operationString + ' successful!',
            result: sqlRes.insertId
          });
          resolve(true);
        } else {
          // If no entry in db, failure
          res.json({
            success: false,
            message:
              operationString +
              ' failed. The desired data was not found in the database.'
          });
          resolve(false);
        }
      });
    } catch (err) {
      // Ambiguous failure
      console.err(err);
      res.json({
        success: false,
        message: operationString + ' unsuccessful. This may be network related.'
      });
    }
  });
};

module.exports = {
  signup: signup,
  login: login,
  queryDatabase: queryDatabase,
  queryDatabaseBoolean: queryDatabaseBoolean
};
