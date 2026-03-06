"use strict";

var product = require('../../models/product-model');

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("Product controller running");
          // const products=await product.find({});
          // console.log(products)
          res.render('client/pages/products/index.pug', {
            title: "Test",
            boxheadTitle: "Check"
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};