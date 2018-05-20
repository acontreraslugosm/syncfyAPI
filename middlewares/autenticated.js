'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_password';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.autorization) {
        return res.status(403).send({
            message: "You don't have permissions to see this file."
        });
    }

    var token = req.headers.autorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.expiration_date <= moment().unix()) {
            return res.status(401).send({
                message: "Expired token."
            });
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({
            message: "Invalid token."
        });
    }

    req.user = payload;

    next();
};