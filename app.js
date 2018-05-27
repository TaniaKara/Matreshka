const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require("mongoose");
require('./models/Users');
require('./services/passport');
require('./routes/auth')(app);
require('./config/server');

mongoose.connect(keys.mongoURI);

app.get('/', (req, res, next)=> res.send('Hello World!'));
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));