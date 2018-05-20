'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');


function saveUser(req, res){
    var user = new User();
    var params = req.body;

    console.log(params);

    user.firstname = params.firstname;
    user.lastname = params.lastname;
    user.age = params.age;
    user.genre = params.genre;
    user.date_of_birth = params.date_of_birth;
    user.email = params.email;
    user.image = 'https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg';
    user.role = 'ROLE_ADMIN';

    if(params.password){
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            if(user.firstname != null && user.lastname != null && user.email != null){
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({
                            message: 'Error when saving the user'
                        });
                    } else {
                        if(!userStored){
                            res.status(404).send({
                                message: 'The user has not registered'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'The fields Firstname, Lastname and Password are required'
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'The password is required'
        });
    }
}

module.exports = {
    saveUser
};