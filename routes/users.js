'use strict'

var express = require('express');
var UsersController = require('../controllers/users');
var md_auth = require('../middlewares/autenticated');
var api = express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: './uploads/users'});

api.get('/prueba', md_auth.ensureAuth, UsersController.prueba);
api.post('/register', UsersController.saveUser);
api.post('/login', UsersController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UsersController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UsersController.uploadImage);
api.get('/get-image-user/:imageFile', UsersController.getImageFile);

module.exports = api;


