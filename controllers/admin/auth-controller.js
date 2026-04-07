const dataAccounts = require('../../models/account-models')
const systemConfig = require('../../config/system')
const PATH_ADMIN = systemConfig.prefixAdmin;
const md5 = require('md5')
module.exports.getLogin = (req, res) => {
  res.render('admin/pages/auth/login.pug', { title: "Đăng nhập", oldData: req.flash('oldData')[0] || "" })
}
module.exports.postLogin = async (req, res) => {
  let find = {
    deleted: false,
    email: req.body.email,
    password: md5(req.body.password)
  }
  let checkAccount = await dataAccounts.findOne(find)
  if (!checkAccount) {
    req.flash('error', 'Tài khoản hoặc mật khẩu không hợp lệ')
    req.flash('oldData', req.body.email)
    res.redirect(PATH_ADMIN + '/auth/login')
    return;
  }
  else if (checkAccount.status == "inactive") {
    req.flash('error', "Tài khoản đang ở trạng thái ngừng hoạt động!")
    req.flash('oldData', req.body.email)
    res.redirect(PATH_ADMIN + '/auth/login')
    return;
  }
  else {
    req.flash('success', "Đăng nhập thành công")
    res.cookie('token', checkAccount.token)
    res.redirect(`${PATH_ADMIN}/dashboard`)
  }
}
module.exports.logout=(req,res)=>{
  res.clearCookie('token')
  res.redirect(PATH_ADMIN+'/auth/login')
}