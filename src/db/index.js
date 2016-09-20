'use strict'
var mongoose = require('mongoose');
var config   = require('../app/config');


mongoose.connect( config.get('uriDB'), function (error){ 
   console.log('mongoose.connect !!!!');
    if (error) {
        console.log(error);
    }
});
var Mongo =  mongoose.connection;
module.exports = Mongo;