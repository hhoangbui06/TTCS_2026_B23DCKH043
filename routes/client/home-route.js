const express=require('express')
const controller=require('../../controllers/client/home-controller')
const router=express.Router()
// [GET] /
router.get('/', controller.index)
module.exports=router;