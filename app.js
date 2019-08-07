"use strict";

const express     = require('express');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const path        = require('path');

const app = express();
const config = require('./config')();

const users = require('./routes/api/users');
const exercises = require('./routes/api/exercises');

app.use(helmet.hidePoweredBy({ setTo: 'PHP/4.2.0' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useCreateIndex: true
}; 

mongoose
  .connect(config.MONGO_URI, options)
  .then(() => console.log(`...Connected to MongoDB at ${config.MONGO_URI}...`))
  .catch(err => console.log(err));

app.use('/api/users/', users);
app.use('/api/exercises/', exercises);

app.listen(config.PORT, () => {
  console.log(`...Listening on port ${config.PORT}...`);
  console.log(`...Running server on ${config.NODE_ENV} mode...`)
});

module.exports = app;
