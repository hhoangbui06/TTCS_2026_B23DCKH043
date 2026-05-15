const dataProducts=require('../../models/product-model')
const dataAccounts=require('../../models/account-models')
module.exports.index=async(req,res)=>{
  const deletedProducts=await dataProducts.find({deleted:true});
  for (let product of deletedProducts){
    if(product.deletedBy.account_id){
      let user_id=product.deletedBy.account_id;
      let user=await dataAccounts.findOne({_id:user_id}).select("fullName _id")
      if(user){
        product.deleteUser=user;
      }
    }
  }
  res.render('admin/pages/bin/index.pug', {title:"Recycle Bin", products:deletedProducts});
}
module.exports.deleteItem=async(req,res)=>{
  let id=req.params.id;
  await dataProducts.deleteOne({_id:id})
  req.flash("success", "Đã xóa thành công!")
  res.redirect(req.headers.referer)
}
module.exports.recoveryItem=async(req,res)=>{
  let id=req.params.id;
  let recoveryInfo={
    account_id:res.locals.user._id,
    recoveryAt:new Date()
  }
  await dataProducts.updateOne({_id:id}, {deleted:false, recoveryBy:recoveryInfo})
  req.flash('success', "Khôi phục thành công!")
  res.redirect(req.headers.referer)
}
module.exports.recoveryAll=async(req,res)=>{
  await dataProducts.updateMany({}, {deleted:false})
  req.flash("success", "Đã khôi phục toàn bộ sản phẩm!")
  res.redirect(req.headers.referer)
}
module.exports.changeMulti=async(req,res)=>{
  let type=req.body.type, ids=req.body.ids.split(",")
  switch(type){
    case "delete-multi":
      await dataProducts.deleteMany({_id:{$in:ids}})
      req.flash("success", `Đã xóa ${ids.length} sản phẩm!`)
      res.redirect(req.headers.referer)
      break;
    case "recovery-multi":
      await dataProducts.updateMany({_id:{$in:ids}}, {deleted:false})
      req.flash('success', `Đã khôi phục ${ids.length} sản phẩm!`)
      res.redirect(req.headers.referer)
      break;
  }
}