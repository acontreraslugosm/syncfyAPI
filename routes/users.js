'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var api = express.Router();

api.post('/register', UsersController.saveUser);

module.exports = api;


