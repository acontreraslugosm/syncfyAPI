'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongsSchema = Schema ({
    number: Number,
    title: String,
    duration: String,
    file: String,
    album:{ type: Schema.ObjectId, ref: 'Albums'}
});

module.exports = mongoose.model('Songs', SongsSchema);
