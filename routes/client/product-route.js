const express=require('express');
const router=express.Router();
const controller=require('../../controllers/client/product-controller')

// [GET] /products
router.get('/', controller.index)
module.exports=router;
