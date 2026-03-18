const express=require('express');
const router=express.Router();
const controller=require('../../controllers/client/product-controller')

// [GET] /products
module.exports=router.get('/', controller.index)

module.exports=router.get('/details/:slug', controller.detailItem)
