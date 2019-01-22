const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/database');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    if('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../dist/index.html'));
});

db.getConnection((err, connection) => {
    if (err) console.error('Database connection failed: ' + err.stack);
    console.log('Connected to database.');

    app.post('/users', (req, res) => {
        db.query('SELECT * FROM Persons', function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({body: result})
        });
    })

    connection.release();
});

const port = process.env.PORT || 4201;
app.listen(port, () => { console.log('Listening on port 4201...'); });