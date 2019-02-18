'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Config = require('./Config');
const port = process.env.PORT || 4201;

// Routes
const accomRoutes = require('./controller/accomRoutes');
const authRoutes = require('./controller/authRoutes');
const planRoutes = require('./controller/planRoutes')
const tranRoutes = require('./controller/tranRoutes');
const tripRoutes = require('./controller/tripRoutes');

// App configuration
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.route('/*', (req, res) => {
  res.redirect(__dirname + '/../dist/index.html');
});
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json());
app.use(bodyParser.json());
app.use(Config.AccessControl);

// App route configuration
app.use('/', authRoutes); // Authentication routes
app.use('/trip', tripRoutes); // Trip routes
app.use('/plan', planRoutes); // Plan routes
app.use('/accom', accomRoutes); // Accommodation routes
app.use('/tran', tranRoutes); // Transportation routes

app.listen(port, () => console.log(`Listening on port: ${port}...`));
