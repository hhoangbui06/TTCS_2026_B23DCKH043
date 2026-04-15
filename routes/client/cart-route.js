const express=require('express')
const route=express.Router();
const controller=require('../../controllers/client/cart-controller')

route.get('/', controller.index)
route.post('/add/:productId', controller.postAddProduct)
route.delete('/delete/:productId', controller.deleteProduct)
route.post('/change-quantity/:productId/:newQuantity', controller.postChangeQuantity)
module.exports=route;