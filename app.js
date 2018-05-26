const express = require('express');
const app = express();
require('./services/passport');
require('./routes/auth')(app);
require('./config/server');

app.get('/', (req, res, next)=> res.send('Hello World!'));
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));