const dataProducts=require('../../models/product-model')
const setDetail=require('../../helpers/set-detail-helper')
module.exports.index = async (req, res) => {
  let findFeatured={
    deleted:false,
    featured:"1",
    status:"active"
  }
  let findRecently={
    deleted:false,
    status:"active"
  }
  let featuredProducts=await dataProducts.find(findFeatured);
  let recentlyProducts=await dataProducts.find(findRecently).sort({position:"desc"}).limit(6);
  featuredProducts=setDetail.setNewPrice(featuredProducts)
  res.render('client/pages/home/index.pug', { title: "Home", featuredProducts:featuredProducts, recentlyProducts:recentlyProducts})
} 