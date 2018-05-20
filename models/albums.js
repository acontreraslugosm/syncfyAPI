'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumsSchema = Schema ({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist:{ type: Schema.ObjectId, ref: 'Artists'}
});

module.exports = mongoose.model('Albums', AlbumsSchema);
