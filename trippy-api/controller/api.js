const db = require('../model/database');
const pool = db.getPool();

const API = {
  allUsers(req, res) {
    pool.getConnection((err, con) => {
      con.query('SELECT * FROM Persons', (err, result) => {
        res.status(200).send({ body: result });
        con.release();
      });
    });
  }
};

module.exports = API;
