const dashboardRoute = require('./dashboard-route')
const systemConfig = require('../../config/system')
const productsRoute = require('./products-route')
const categoryRoute = require('./category-route')
const roleRoute = require('./role-route')
const accountsRoute = require('./accounts-route');
const authRoute = require('./auth-route')
const authMiddleware = require('../../middlewares/admin/auth-middleware')
const myAccountRoute = require('./my-account-route')
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + '/auth', authRoute)
  app.use(authMiddleware.authLogin)
  app.use(PATH_ADMIN + '/dashboard', dashboardRoute)
  app.use(PATH_ADMIN + '/products', productsRoute)
  app.use(PATH_ADMIN + '/categories', categoryRoute)
  app.use(PATH_ADMIN + '/roles', roleRoute)
  app.use(PATH_ADMIN + '/accounts', accountsRoute)
  app.use(PATH_ADMIN + '/my-account', myAccountRoute)
}