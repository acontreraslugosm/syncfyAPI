'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/syncfy', (err, res) => {
    if(err){
        throw err;
    } else {
        console.log("DB Running (Connection Success)");

        app.listen(port, function(){
            console.log("API REST http://localhost:" + port);
        });
    }
});