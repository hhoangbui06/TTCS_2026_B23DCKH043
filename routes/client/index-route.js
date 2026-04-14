const productRoutes = require("./product-route");
const homepageRoutes = require("./home-route");
const headerMiddleware = require('../../middlewares/client/header-middleware')
const searchRoutes=require('./search-route')
const cartMiddleware=require('../../middlewares/client/cart-middleware')
const cartRoute=require('./cart-route');
module.exports = (app) => {
  app.use(cartMiddleware.checkCart)
  app.use(headerMiddleware.getCategory)
  app.use('/', homepageRoutes)
  app.use('/products', productRoutes)
  app.use('/search', searchRoutes)
  app.use('/cart', cartRoute)
}