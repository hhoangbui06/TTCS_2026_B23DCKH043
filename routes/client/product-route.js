const express=require('express');
const router=express.Router();
const controller=require('../../controllers/client/product-controller')

// [GET] /products
module.exports=router.get('/', controller.index)

module.exports=router.get('/details/:slug', controller.detailItem)
module.exports=router.get('/recently', controller.getRecentlyProducts)
module.exports=router.get('/featured', controller.getFeaturedProducts)
module.exports=router.get('/best-sale', controller.getBestSaleProducts)
module.exports=router.get('/:slugCategory', controller.categoryProducts)