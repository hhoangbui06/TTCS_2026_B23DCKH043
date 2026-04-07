module.exports.createAccount = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash('error', 'Vui lòng nhập tên!')
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  if (!req.body.email) {
    req.flash('error', 'Vui lòng nhập email!')
    req.flash('oldData', req.body)

    res.redirect(req.headers.referer)
    return;
  }
  if (!req.body.password) {
    req.flash('error', 'Vui lòng nhập mật khẩu!')
    req.flash('oldData', req.body)

    res.redirect(req.headers.referer)
    return;
  }
  if(req.body.password.length<6){
    req.flash('error', 'Mật khẩu phải ít nhất 6 ký tự!')
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  next();
}