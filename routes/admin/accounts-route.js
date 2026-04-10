const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/accounts-controller')
const multer = require('multer')
const upload = multer()
const uploadCloud = require('../../middlewares/admin/fileupload-middleware')
const validate = require('../../validate/admin/account-validate')


module.exports = router.get('/', controller.index)
module.exports = router.post('/create', upload.single('avatar'), uploadCloud.upload, validate.createAccount, controller.createAccount)
module.exports = router.get('/create', controller.create)
module.exports = router.get('/edit/:id', controller.edit)
module.exports = router.patch('/edit/:id', upload.single('avatar'), uploadCloud.upload, validate.patchAccount, controller.patchAccount)
module.exports = router.get('/detail/:id', upload.single('avatar'), uploadCloud.upload, controller.detailAccount)
module.exports = router.delete('/delete/:id', controller.deleteAccount);
module.exports = router.post('/change-status/:status/:id', controller.changeAccountStatus)