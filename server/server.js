const express = require('express');
const http = require('http')
const path = require('path');
//import { routing } from './routing';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

//app.use(routing);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Listening on port ' + port));