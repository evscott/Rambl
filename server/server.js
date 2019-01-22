const express = require('express');
const http = require('http')
const path = require('path');
const mysql = require('mysql');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../dist/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on ${ port }`));

const con = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME || 'trippydatabase.cnioslqsy5gc.us-west-2.rds.amazonaws.com',
    user     : process.env.RDS_USERNAME || 'escott07',
    password : process.env.RDS_PASSWORD || 'password12yu',
    port     : process.env.RDS_PORT || '3306',
    database : process.env.RDS_DATABASE || 'trippydatabase'
});

con.connect(function(err) {
    if (err) console.error('Database connection failed: ' + err.stack);
    console.log('Connected to database.');
});

app.post('/users', (req, res) => {
    db.query('SELECT * FROM Persons', function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send({body: result})
    });
});

connection.release();