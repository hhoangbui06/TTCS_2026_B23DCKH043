"use strict";

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  id: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  "delete": Boolean
});
var product = mongoose.model("Product", productSchema);
module.exports = product;