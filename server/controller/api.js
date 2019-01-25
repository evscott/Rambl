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
  },
  ping(req, res) {
    res.get([{ ping: 'ping' }]);
  },
  register(req, res) {
    res.post([{ register: 'register' }]);
  },
  login(req, res) {
    res.post([{ login: 'login' }]);
  },
  getStatus(req, res) {
    res.get([{ status: 'status' }]);
  }
};

module.exports = API;
