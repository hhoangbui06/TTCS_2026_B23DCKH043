const productRoutes = require("./product-route");
const homepageRoutes = require("./home-route");
const headerMiddleware = require('../../middlewares/client/header-middleware')
module.exports = (app) => {
  app.use(headerMiddleware.getCategory)
  app.use('/', homepageRoutes)
  app.use('/products', productRoutes)
}