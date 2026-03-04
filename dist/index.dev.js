"use strict";

var express = require('express');

var app = express();

require('dotenv').config();

var port = process.env.PORT;

var route = require("./routes/client/index-route.js");

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express["static"]("public"));
route(app);
app.listen(port, function () {
  console.log("Welcome port ".concat(port));
});