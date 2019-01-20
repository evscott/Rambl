import * as express from 'express';
const app = express.Router();
const db = require('./Config.ts').mysql_pool;

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
    }

    console.log('Connected to database.');

    connection.release();
});

// Test get & post
app.get('/users', (req, res) => res.send([]));
app.post('/users', (req, res) => res.send({body: req.body}));

export { app as routes };
