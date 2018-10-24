const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Content-type','application/json');
    res.setHeader('Accept','application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin');
    next();
});

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./routes/users.route.js')(app);
require('./routes/projects.route.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
