const express=require('express')
const router=express.Router();
const controller=require('../../controllers/admin/products-controller')

// [GET] /admin/
module.exports=router.get('/', controller.index)
// [PATCH] /admin/products/change-status/:status(active,inactive)/:id
module.exports=router.patch('/change-status/:status/:id', controller.changeStatus)
// [PATCH] /admin/products/change-multi
module.exports=router.patch('/change-multi', controller.changeMulti)
// [DELETE] /admin/products/delete/:id
module.exports=router.delete('/delete/:id', controller.deleteProduct)
//[GET] /admin/products/recovery
module.exports=router.get('/recovery', controller.recovery)