const express = require('express');
const app = express();
const path = require('path');
const Configs = require('./Configs');
const API = require('./controller/api');

app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json());
app.use(Configs.AccessControl);

app.route('/*', function(req, res) {
  res.redirect(__dirname + '/../dist/index.html');
});

app.get('/api/allusers', API.allUsers);

app.listen(process.env.PORT || 4201, () => {
  console.log('Listening on port 4201...');
});
