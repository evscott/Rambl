const db = require("../model/database");
const pool = db.getPool();

const API = {
  generalQuery(req, res) {
    pool.getConnection((err, con) => {
      con.query(req.body.query, function(err, result) {
        try {
          if (err) throw err;
          res.status(200).send({ body: result });
          con.release();
        } catch (error) {
          console.error(JSON.stringify(error));
          res.status(400).send({ error: error });
        }
      });
    });
  }
};

module.exports = API;
