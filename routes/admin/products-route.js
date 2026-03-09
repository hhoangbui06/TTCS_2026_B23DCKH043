const express=require('express')
const router=express.Router();
const controller=require('../../controllers/admin/products-controller')

// [GET] /admin/
module.exports=router.get('/', controller.index)