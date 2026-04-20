const dataUsers=require('../../models/user-model')
module.exports.checkLogin=async(req,res, next)=>{
  if (!req.cookies.tokenUser){
    res.redirect('/users/login')
    req.flash('error', "Vui lòng đăng nhập!")
    return;
  }
  else{
    let user=await dataUsers.findOne({
      tokenUser:req.cookies.tokenUser,
      deleted:false,
    }).select('-password')
    if(!user){
      res.clearCookie('tokenUser')
      req.flash('error', "Vui lòng đăng nhập!");
      res.redirect('/users/login')
      return
    }
    else if(user.status!="active"){
      req.flash('error', "Tài khoản bị ngừng hoạt động. Vui lòng đăng nhập lại!")
      res.clearCookie("tokenUser")
      res.redirect('/users/login')
      return
    }
    else{
      res.locals.user=user;
    }
  }
  next();
}
module.exports.checkReset=(req,res, next)=>{
  let token=req.cookies.tokenUser;
  if (!token){
    req.flash('error', "Bạn cần xác thực để cập nhật mật khẩu!")
    res.redirect('/users/password/forgot')
    return;
  }
  next();
}