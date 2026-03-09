const express=require('express')
const route=express.Router()
// [GET] /admin/dashboard
const controller=require('../../controllers/admin/dashboard-controller')
route.get('/', controller.dashboard)
module.exports=route;