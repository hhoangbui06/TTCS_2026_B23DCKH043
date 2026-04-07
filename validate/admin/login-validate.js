module.exports.checkLogin=(req,res, next)=>{
  if (!req.body.email || !req.body.password){
    req.flash('error', 'Vui lòng điền đẩy đủ thông tin đăng nhập')
    req.flash('oldData', req.body.email);
    res.redirect(req.headers.referer);
    return
  }
  next()
}