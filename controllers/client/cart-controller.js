const dataCart = require('../../models/cart-models')

module.exports.postAddProduct = async (req, res) => {
  let productId = req.params.productId;
  let quantity = Number(req.body.quantity);
  let cartId = req.cookies.cartId;
  let cart = await dataCart.findOne({
    _id: cartId
  })
  if (cart) {
    let newItems = {
      product_id: productId,
      quantity: quantity
    }
    let products = cart.products;
    let checkExistsProduct = products.find(item => item.product_id == productId);
    if (!checkExistsProduct) {
      await dataCart.updateOne({ _id: cartId }, { $push: { products: newItems } })
      req.flash('success', "Đã thêm mới đơn hàng vào giỏ!");
      res.redirect(req.headers.referer)
    }
    else {
      let currentQuantity = Number(checkExistsProduct.quantity);
      let newQuantity = currentQuantity + quantity;
      await dataCart.updateOne({ _id: cartId, 'products.product_id': productId }, { $set: { 'products.$.quantity': newQuantity } })
      req.flash('success', "Đã cập nhật đơn hàng trong giỏ!")
      res.redirect(req.headers.referer)
    }
  }
  else {
    req.flash('error', 'Không tìm thấy giỏ hàng!')
    res.redirect(req.headers.referer)
    return;
  }
}