const express = require('express')
const route = express.Router();
const controller = require('../../controllers/client/user-controller')
const validate = require('../../validate/client/user-validate')
const authMiddleware = require('../../middlewares/client/auth-middleware')
const uploadCloud = require('../../middlewares/client/fileupload-middleware')
const multer = require('multer')
const upload = multer();

route.get('/register', upload.single('avatar'), uploadCloud.upload, controller.getRegister)
route.post('/register', upload.single('avatar'), uploadCloud.upload, validate.checkRegister, controller.postRegister)
route.get('/login', controller.getLogin)
route.post('/login', validate.checkLogin, controller.postLogin)
route.get('/logout', controller.getLogout)
route.get('/password/forgot', controller.getForgotPassword)
route.post('/password/forgot', controller.postForgotPassword)
route.get('/password/otp', controller.getOTPPassword)
route.post('/password/otp', controller.postOTPPassword)
route.get('/password/reset', authMiddleware.checkReset, controller.getResetPassword)
route.post('/password/reset', authMiddleware.checkReset, validate.checkResetPassword, controller.postResetPassword)
route.get('/info', upload.single('avatar'), uploadCloud.upload, authMiddleware.checkLogin, controller.getInfo)
route.get('/info/edit', authMiddleware.checkLogin, controller.getEditInfo)
route.patch('/info/edit', authMiddleware.checkLogin, upload.single('avatar'), uploadCloud.upload, validate.checkEditUser, controller.patchInfoEdit)
module.exports = route