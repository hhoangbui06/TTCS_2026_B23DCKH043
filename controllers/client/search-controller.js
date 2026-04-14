const dataProducts=require('../../models/product-model')
const searchHelper=require('../../helpers/search-helper')
const setDetail=require('../../helpers/set-detail-helper')

module.exports.index=async(req,res)=>{
  let searchKey=searchHelper(req.query);
  let records=await dataProducts.find({
    deleted:false,
    status:'active',
    title:searchKey.title||""
  })
  records=setDetail.setNewPrice(records)
  res.render('client/pages/search/index.pug', {title:"Kết quả tìm kiếm", records:records, keyword:searchKey.keyword})
}