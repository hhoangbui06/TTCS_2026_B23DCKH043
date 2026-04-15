const dataUsers = require('../../models/user-model')
const md5=require('md5')
module.exports.getRegister = (req, res) => {
  res.render('client/pages/users/register.pug', { title: "Đăng ký tài khoản", oldData: req.flash('oldData')[0] || {} })
}
module.exports.postRegister = async (req, res) => {
  let newInfo = req.body;
  let checkExistsEmail = await dataUsers.findOne({
    email: newInfo.email,
    deleted: false
  })
  if (checkExistsEmail) {
    req.flash('error', "Tài khoản đã tồn tại!")
    req.flash('oldData', newInfo)
    res.redirect(req.headers.referer)
  }
  else {
    newInfo.password=md5(newInfo.password)
    let newUser=new dataUsers(newInfo)
    await newUser.save();
    req.flash('success', "Đăng ký tài khoản thành công! Hãy đăng nhập!")
    res.redirect('/users/login')
  }
}
module.exports.getLogin=(req,res)=>{
  res.render('client/pages/users/login.pug', {title:"Đăng nhập", oldData:req.flash('oldData')[0]||{}})
}
module.exports.postLogin=async(req,res)=>{
  const loginInfo=req.body;
  let checkExistsUser=await dataUsers.findOne({
    email:loginInfo.email,
    password: md5(loginInfo.password)
  });
  if(!checkExistsUser){
    req.flash('error', "Thông tin đăng nhập không chính xác!")
    req.flash('oldData', loginInfo)
    res.redirect(req.headers.referer)
  }
  else{
    res.cookie("tokenUser", checkExistsUser.tokenUser);
    req.flash("success", "Đăng nhập thành công!")
    res.locals.user=checkExistsUser
    console.log(res.locals.user)
    res.redirect('/')
  }
}
module.exports.getLogout=async(req,res)=>{
  delete res.locals.user;
  res.clearCookie('tokenUser');
  res.redirect(req.headers.referer)
}