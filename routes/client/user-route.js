const express = require('express')
const route = express.Router();
const controller = require('../../controllers/client/user-controller')
const validate = require('../../validate/client/user-validate')

route.get('/register', controller.getRegister)
route.post('/register', validate.checkRegister, controller.postRegister)
route.get('/login', controller.getLogin)
route.post('/login', validate.checkLogin, controller.postLogin)
route.get('/logout', controller.getLogout)
route.get('/password/forgot', controller.getForgotPassword)
route.post('/password/forgot', controller.postForgotPassword)
route.get('/password/otp', controller.getOTPPassword)
route.post('/password/otp', controller.postOTPPassword)
route.get('/password/reset', controller.getResetPassword)
route.post('/password/reset', validate.checkResetPassword, controller.postResetPassword)
module.exports = route