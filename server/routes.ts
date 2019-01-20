import * as express from 'express';
const app = express.Router();
const db = require('./Config.ts').mysql_pool;

db.getConnection((err, connection) => {
    if (err) console.error('Database connection failed: ' + err.stack);
    console.log('Connected to database.');

    app.post('/users', (req, res) => {
        db.query(req.body.query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({body: result})
        });
    });

    //connection.release();
});

export { app as routes };
