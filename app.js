const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/auth')(app);
require('./config/server');

mongoose.connect(keys.mongoURI);

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routers
const tasksRouter = require('./api/tasks.js');
app.use('/tasks', tasksRouter);

const usersRouter = require('./api/users.js');
app.use('/users', usersRouter);