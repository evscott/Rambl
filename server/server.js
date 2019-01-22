const express = require('express');
const http = require('http')
const path = require('path');
import { routes } from './routing';
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT, GET, DELETE');

    if('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Listening on port ' + port));