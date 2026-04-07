const express=require('express')
const router=express.Router();
const validate=require('../../validate/admin/login-validate')
const controller=require('../../controllers/admin/auth-controller')
module.exports=router.get('/login', controller.getLogin)
module.exports=router.post('/login',validate.checkLogin, controller.postLogin)
module.exports=router.get('/logout', controller.logout)