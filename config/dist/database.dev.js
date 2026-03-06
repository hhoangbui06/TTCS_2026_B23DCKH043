"use strict";

var mongoose = require('mongoose');

require('dotenv').config();

module.exports.connect = function () {
  mongoose.connect(process.env.MONGODB).then(function () {
    return console.log('Connected to MongoDB!');
  })["catch"](function () {
    return console.log('Failed to connect database!');
  });
};