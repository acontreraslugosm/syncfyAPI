'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_password';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        expiration_date: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};  