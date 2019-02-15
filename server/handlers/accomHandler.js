const databaseHandler = require('./databaseHandler');

/**
 * Gets the information for all accommodations and gives it back to
 * the user using the res object.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let getAccoms = async (req, res) => {
  const query = `SELECT *
                  FROM accoms
                  WHERE trip_id IN
                    (SELECT trip_id FROM trips
                    WHERE user_id = ?)`;
  const params = [req.body.user_id];
  return databaseHandler.queryDatabase(res, query, params, 'Get accoms');
};

/**
 * Adds a new accommodation to the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let addAccom = async (req, res) => {
  console.log(req.body);
  const query = `INSERT INTO accoms (trip_id, cost, check_in, begin_time, 
                  end_time, loc, dscript, completed, priority)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    req.body.trip_id,
    req.body.cost,
    req.body.check_in,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.dscript,
    req.body.completed,
    req.body.priority
  ];

  return databaseHandler.queryDatabaseBoolean(res, query, params, 'Add plan');
};

/**
 * Updates a pre-existing accommodation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let updateAccom = async (req, res) => {
  const query = `UPDATE accoms 
                  SET cost=?, check_in=?, begin_time=?, end_time=?, loc=?, 
                  dscript=?, completed=?, priority=?
                  WHERE trip_id=? AND e_id=?;`;
  const params = [
    req.body.cost,
    req.body.check_in,
    req.body.begin_time,
    req.body.end_time,
    req.body.loc,
    req.body.dscript,
    req.body.completed,
    req.body.priority,
    req.body.trip_id,
    req.body.e_id
  ];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Update plan'
  );
};

/**
 * Deletes a pre-existing accommodation from the database.
 * @param req the request
 * @param res the resource to give the response
 * @returns {Promise<void>} the promise indicating success
 */
let deleteAccom = async (req, res) => {
  const query = `DELETE FROM accoms WHERE trip_id = ? AND e_id=?`;
  const params = [req.body.trip_id, req.body.e_id];
  return databaseHandler.queryDatabaseBoolean(
    res,
    query,
    params,
    'Delete plan'
  );
};

module.exports = {
  getAccoms: getAccoms,
  addAccom: addAccom,
  updateAccom: updateAccom,
  deleteAccom: deleteAccom
};
