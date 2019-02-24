const db = require('../model/database');
const pool = db.getPool();

/**
 * Database signup query handler. It attempts to sign the user up, and adds the
 * results of the query to the res object.
 * @param email the email being used to sign up ** must be distinct **
 * @param password the password being used to sign up
 * @param fName the first name being used to sign up
 * @param lName the last night being used to sign up
 * @returns {Promise<*>} the promise indicating success/failure
 */
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

/**
 * Database login query handler. It attempts to log the user in, and adds the
 * results of the query to the res object.
 * @param email the email being used to login
 * @param password the password being used to login
 * @returns {Promise<*>} the promise indicating success/failure
 */
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
 * @param params the parameters in the SQL query
 * @param operationString the string representing the operation
 * being performed, which is used for explaining what results of
 * the operation are.
 * @returns {Promise<void>} the promise indicating success/failure
 */
let queryDatabase = async (res, query, params, operationString) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, params, (err, sqlRes) => {
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
 * @param params the parameters in the SQL query
 * @param operationString the string representing the operation
 * being performed, which is used for explaining what results of
 * the operation are.
 * @returns {Promise<void>} the promise indicating success/failure
 */
let queryDatabaseBoolean = async (res, query, params, operationString) => {
  return new Promise((resolve, reject) => {
    try {
      // Using the params puts parameters into the SQL query whenever
      // there is a ? in the query. It escapes these to prevent SQL
      // injection.
      pool.query(query, params, (err, sqlRes) => {
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
          // Note that it returns the insertId, which is 0 unless an actual
          // insert was performed. Consider refactoring this.
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

let queryDatabaseSilent = async (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, params, (err, sqlRes) => {
        if (err) {
          // If failure accessing db, failure
          reject(err);
        } else {
          resolve(sqlRes);
        }
      });
    } catch (err) {
      // Ambiguous failure
      console.err(err);
      reject(err);
    }
  });
};

module.exports = {
  signup: signup,
  login: login,
  queryDatabase: queryDatabase,
  queryDatabaseBoolean: queryDatabaseBoolean,
  queryDatabaseSilent: queryDatabaseSilent
};
