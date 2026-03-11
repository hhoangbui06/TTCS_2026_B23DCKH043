const express=require('express')
const router=express.Router();
const controller=require('../../controllers/admin/products-controller')

// [GET] /admin/
module.exports=router.get('/', controller.index)
module.exports=router.patch('/change-status/:status/:id', controller.changeStatus)
module.exports=router.patch('/change-multi', controller.changeMulti)