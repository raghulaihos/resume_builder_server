
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require('../postgres/connection');
const search_routes = require('./routes/search');
const auth_routes = require('./routes/auth');
const data_routes = require('./routes/data');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.use('/', search_routes);
app.use('/auth', auth_routes);
app.use('/data', data_routes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

app.listen(port, () => {
    console.log('Server started at port ', port);
})