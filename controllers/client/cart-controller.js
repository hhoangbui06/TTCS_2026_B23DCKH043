const dataCart = require('../../models/cart-models')
const dataProducts = require('../../models/product-model')
const setDetail=require('../../helpers/set-detail-helper')

module.exports.index = async (req, res) => {
  if (!req.cookies.cartId) {
    req.flash("error", "Không tìm thấy giỏ hàng")
    res.redirect(req.headers.referer);
    return;
  }
  let cart = await dataCart.findOne({
    _id: req.cookies.cartId
  })
  let products = cart.products;
  await Promise.all(products.map(async (item)=>{
    let productId=item.product_id;
    let product=await dataProducts.findOne({
      _id:productId
    }).select('thumbnail price title discountPercentage')
    item.product=setDetail.setNewPriceProduct(product)
  }))
  products.totalPrice=products.reduce((total, item)=>{
    return total+item.product.priceNew*item.quantity
  },0)
  res.render("client/pages/cart/index.pug", {title:"Giỏ hàng", cartProducts:products})
}
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
module.exports.deleteProduct=async(req,res)=>{
  let id=req.params.productId;
  let cartId=req.cookies.cartId
  await dataCart.updateOne({_id:cartId}, {$pull:{products:{product_id:id}}})
  req.flash('success', "Đã xóa sản phẩm khỏi giỏ hàng!")
  res.redirect(req.headers.referer)
}
module.exports.postChangeQuantity=async(req,res)=>{
  let cartId=req.cookies.cartId;
  let productId=req.params.productId, newQuantity=req.params.newQuantity;
  await dataCart.updateOne({_id:cartId, 'products.product_id':productId}, {$set:{'products.$.quantity':newQuantity}});
  req.flash('success', "Đã cập nhật số lượng sản phẩm!")
  res.redirect(req.headers.referer)
}