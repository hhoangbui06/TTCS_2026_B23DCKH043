const dataAccounts=require('../../models/account-models')
const md5=require('md5')
module.exports.index=(req,res)=>{
  res.render('admin/pages/my-account/index.pug', {title:"Thông tin cá nhân"})
} 
module.exports.edit=(req,res)=>{
  res.render('admin/pages/my-account/edit.pug', {title:"Chỉnh sửa thông tin cá nhân"})
}
module.exports.patchAccount=async (req,res)=>{
  if (!req.body.password) delete req.body.password;
  else req.body.password=md5(req.body.password)
  let checkEmailExist=await dataAccounts.findOne({
    deleted:false,
    email:req.body.email,
    _id: {$ne: res.locals.user._id}
  })
  if (checkEmailExist){
    req.flash('error', 'Email đã tồn tại')
    res.redirect(req.headers.referer)
    return;
  }
  let account=res.locals.user;
  console.log(account)
  await dataAccounts.updateOne({_id:account._id}, req.body);
  req.flash('success', "Đã cập nhật thông tin tài khoản thành công!")
  res.redirect(req.headers.referer)
}