'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express()

//Routes
var users_routes = require('./routes/users');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Base Routes
app.use('/api', users_routes);



module.exports = app;