const express = require('express')
const app = express();
const router = express.Router();
const controller = require('../../controllers/admin/role-controller')


module.exports = router.get('/', controller.index)
module.exports = router.get('/create', controller.create)
module.exports = router.post('/create', controller.createRole)
module.exports = router.get('/detail/:id', controller.detailRole)
module.exports = router.get('/edit/:id', controller.edit)
module.exports = router.patch('/edit/:id', controller.editRole)
module.exports = router.delete('/delete/:id', controller.deleteRole)
module.exports = router.get('/permissions', controller.permissionIndex)
module.exports = router.patch('/permissions', controller.patchPermissions)