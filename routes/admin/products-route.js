const express = require('express')
const router = express.Router();
const controller = require('../../controllers/admin/products-controller')

const multer = require('multer')
const upload = multer()

const validate = require('../../validate/admin/product-validate')
const uploadCloud=require('../../middlewares/admin/fileupload-middleware')
// [GET] /admin/
module.exports = router.get('/', controller.index)
// [PATCH] /admin/products/change-status/:status(active,inactive)/:id
module.exports = router.patch('/change-status/:status/:id', controller.changeStatus)
// [PATCH] /admin/products/change-multi
module.exports = router.patch('/change-multi', controller.changeMulti)
// [DELETE] /admin/products/delete/:id
module.exports = router.delete('/delete/:id', controller.deleteProduct)
// [GET]/admin/products/create
module.exports = router.get('/create', upload.single('thumbnail'), uploadCloud.upload, controller.create)
// [POST] /admin/products/create
module.exports = router.post('/create', upload.single('thumbnail'), uploadCloud.upload, validate.createItem, controller.createItem)

module.exports = router.get('/edit/:id', controller.editItem)
module.exports = router.patch('/edit/:id', upload.single('thumbnail'), uploadCloud.upload, validate.createItem, controller.editProduct)
module.exports = router.get('/detail/:id', controller.detailItem)