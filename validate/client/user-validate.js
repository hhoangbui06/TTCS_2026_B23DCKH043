module.exports.checkRegister=(req,res,next)=>{
  if(!req.body.fullName){
    req.flash('error', "Họ và tên không được để trống!")
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  if(!req.body.email){
    req.flash('error', "Email không được để trống!")
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  if(!req.body.password){
    req.flash('error', "Mật khẩu không được để trống!")
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  next()
}
module.exports.checkLogin=(req,res,next)=>{
  if(!req.body.email){
    req.flash('error', "Email không được để trống!")
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  if(!req.body.password){
    req.flash('error', "Mật khẩu không được để trống!")
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  
  next()
}