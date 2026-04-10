const dataProducts=require('../../models/product-model')
const setDetail=require('../../helpers/set-detail-helper')
module.exports.index = async (req, res) => {
  let find={
    deleted:false,
    featured:"1"
  }
  let featuredProducts=await dataProducts.find(find);
  featuredProducts=setDetail.setPrice(featuredProducts)
  res.render('client/pages/home/index.pug', { title: "Home", featuredProducts:featuredProducts})
} 