const express = require('express');
const app = express();
const path = require('path');
const Configs = require('./Configs');
const API = require('./controller/api');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(Configs.AccessControl);

app.get('*', (req, res) => res.sendFile(path.join(__dirname + '../dist/index.html')));
app.post('/users', API.getAllPersonsInfo);

app.listen(process.env.PORT || 4201, () => { console.log('Listening on port 4201...'); });