'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');
var jwt = require('../services/jwt');

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.firstname = params.firstname;
    user.lastname = params.lastname;
    user.age = params.age;
    user.genre = params.genre;
    user.date_of_birth = params.date_of_birth;
    user.email = params.email;
    user.image = 'https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg';
    user.role = 'ROLE_USER';

    if (params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            if (user.firstname != null && user.lastname != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error when saving the user'
                        });
                    } else {
                        if (!userStored) {
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

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Invalid Email"
            })
        } else {
            if (!user) {
                res.status(404).send({
                    message: "Username does not exist"
                })
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            })
                        }
                    } else {
                        res.status(404).send({
                            message: "The user could not log in, try again."
                        })
                    }
                })
            }
        }
    });
}

function prueba(req, res) {
    res.status(200).send({
        message: "Test message"
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error updating the user."
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: "The user could not be updated."
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'the file has not been uploaded.';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[file_split.length - 1];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'jpg' || file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpeg')  {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: "Error updating the user."
                    });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({
                            message: "The user could not be updated."
                        });
                    } else {
                        res.status(200).send({
                            user: userUpdated
                        });
                    }
                }
            });
        } else {
            res.status(200).send({
                message: "File extension not allowed."
            })
        }

        console.log(file_ext);
    } else {
        res.status(200).send({
            message: "No image has been uploaded."
        })
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;

    fs.exists(path_file, function (exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'the image does not exist.'
            })
        }
    })
}

module.exports = {
    prueba,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};