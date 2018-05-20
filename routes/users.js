'use strict'

var express = require('express');
var UsersController = require('../controllers/users');
var md_auth = require('../middlewares/autenticated');
var api = express.Router();

api.get('/prueba', md_auth.ensureAuth, UsersController.prueba);
api.post('/register', UsersController.saveUser);
api.post('/login', UsersController.loginUser);


module.exports = api;


