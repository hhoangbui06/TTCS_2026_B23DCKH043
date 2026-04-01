
const dashboardRoute=require('./dashboard-route')
const systemConfig=require('../../config/system')
const productsRoute=require('./products-route')
const categoryRoute=require('./category-route')
module.exports=(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
    app.use(`${PATH_ADMIN}/products`, productsRoute)
    app.use(`${PATH_ADMIN}/categories`, categoryRoute)
}