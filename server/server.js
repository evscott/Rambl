'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./controller/authroutes');
const Configs = require('./Config');
const port = process.env.PORT || 4201;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.route('/*', (req, res) => {
  res.redirect(__dirname + '/../dist/index.html');
});
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json()); //
app.use(bodyParser.json());
app.use(Configs.AccessControl);
app.use('/', authRoutes);
app.listen(port, () => console.log(`Listening on port: ${port}...`));

// const express = require('express');
// const app = express();
// const path = require('path');
// const Configs = require('./Configs');
// const API = require('./controller/api');
//
// app.use(express.static(path.join(__dirname, '/../dist')));
// app.use(express.json());
// app.use(Configs.AccessControl);
//
// app.route('/*', function(req, res) {
//   res.redirect(__dirname + '/../dist/index.html');
// });
//
// app.get('/api/allusers', API.allUsers);
// app.get('/ping', API.ping);
// app.post('/register', API.register);
// app.post('/login', API.login);
// app.get('/status', API.getStatus)
//
// app.listen(process.env.PORT || 4201, () => {
//   console.log('Listening on port 4201...');
// });
