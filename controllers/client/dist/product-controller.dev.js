"use strict";

module.exports.index = function (req, res) {
  res.render('client/pages/products/index.pug', {
    title: "Product page",
    boxheadTitle: "Danh sách sản phẩm"
  });
};