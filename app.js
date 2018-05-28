const express = require('express');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require("mongoose");
require('./models/Users');
require('./services/passport');
require('./routes/auth')(app);
require('./config/server');

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

app.get('/', (req, res, next)=> res.send('Hello World!'));
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));