const db = require('../model/database');
const pool = db.getPool();

const API = {
    getAllPersonsInfo(req, res) {
        pool.getConnection((err, con) => {
            con.query('SELECT * FROM Persons', function(err, result) {
                if (err) throw err;
                else res.send({body: result});
                con.release();
            });
        });
    }
}

module.exports = API;