const express=require('express');
const route=express.Router();
const controller=require('../../controllers/client/checkout-controller')

route.get('/', controller.index)
route.post('/order', controller.postOrder)
route.get('/success/:orderId', controller.getSuccessOrder)
module.exports=route;