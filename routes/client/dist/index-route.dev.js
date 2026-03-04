"use strict";

var productRoutes = require("./product-route");

var homepageRoutes = require("./home-route");

module.exports = function (app) {
  app.use('/', homepageRoutes);
  app.use('/products', productRoutes);
};