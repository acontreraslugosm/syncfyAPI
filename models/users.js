'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema ({
    firstname: String,
    lastname: String,
    age: Number,
    genre: String,
    date_of_birth: String,
    email: String,
    password: String,
    image: String,
    role: String
});

module.exports = mongoose.model('Users', UsersSchema);
