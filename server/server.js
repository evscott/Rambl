const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Config = require('./Config');
const port = process.env.PORT || 4201;

// Routes
const accomRoutes = require('./controller/accomRoutes');
const authRoutes = require('./controller/authRoutes');
const planRoutes = require('./controller/planRoutes');
const tranRoutes = require('./controller/tranRoutes');
const tripRoutes = require('./controller/tripRoutes');
const userRoutes = require('./controller/userRoutes');

// App configuration
app.use(Config.AccessControl);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  //
  console.log(__dirname, '../build/index.html');
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname + '../build/index.html'));
  });
}

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.use(express.json());

// App route configuration
app.use('/', authRoutes); // Authentication routes
app.use('/trip', tripRoutes); // Trip routes
app.use('/plan', planRoutes); // Plan routes
app.use('/accom', accomRoutes); // Accommodation routes
app.use('/tran', tranRoutes); // Transportation routes
app.use('/user', userRoutes); // User routes

app.listen(port, () => console.log(`Listening on port: ${port}...`));
