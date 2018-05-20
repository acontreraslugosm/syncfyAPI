'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express()

//Routes


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Headers (Http)


//Base Routes


module.exports = app;