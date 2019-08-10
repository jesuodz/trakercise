"use strict";

const express     = require('express');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const path        = require('path');
const passport    = require('passport');
// Configuration
const app         = express();
const config      = require('./config')();
// Routes
const users       = require('./routes/api/users');
const exercise    = require('./routes/api/exercise');

app.use(helmet.hidePoweredBy({ setTo: 'PHP/4.2.0' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect(config.MONGO_URI, config.OPTIONS)
  .then(() => console.log(`...Connected to MongoDB at ${config.MONGO_URI}...`))
  .catch(err => console.log(err));

app.use('/api/users/', users);
app.use('/api/exercise/', exercise);

app.listen(config.PORT, () => {
  console.log(`...Listening on port ${config.PORT}...`);
  console.log(`...Running server on ${config.NODE_ENV} mode...`)
});

module.exports = app;
