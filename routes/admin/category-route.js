const express = require('express')
const route = express.Router();
const controller = require('../../controllers/admin/category-controller')
const uploadCloud = require('../../middlewares/admin/fileupload-middleware-test')
const validate = require('../../validate/admin/category-validate');
const multer = require('multer')
const upload = multer();

module.exports = route.get('/', controller.index)
module.exports = route.get('/create', controller.create)
module.exports = route.post('/create', upload.single('thumbnail'), uploadCloud.upload, validate.createCategory, controller.createCategory)
module.exports = route.post('/change-status/:status/:id', controller.changeStatus)
module.exports = route.delete('/delete/:id', controller.deleteCategory)
module.exports = route.get('/recovery', controller.recoveryAll)
module.exports = route.get('/detail/:id', controller.detailCategory)
module.exports = route.get('/edit/:id', controller.editCategory)
module.exports = route.patch('/edit/:id', upload.single('thumbnail'), uploadCloud.upload, validate.createCategory, controller.patchCategory)
module.exports = route.patch('/change-multi', controller.changeMulti)