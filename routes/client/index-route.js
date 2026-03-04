const productRoutes=require("./product-route");
const homepageRoutes=require("./home-route");
module.exports = (app) => {
    app.use('/', homepageRoutes)
    app.use('/products', productRoutes)
}