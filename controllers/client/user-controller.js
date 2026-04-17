const dataUsers = require('../../models/user-model')
const md5 = require('md5')
const generateHelper = require('../../helpers/generate-helper');
const timeHelper = require("../../helpers/expires-time.helper")
const dataForgotPassword = require('../../models/forgot-password-model')
const sendMail=require('../../helpers/send-mail-helper')


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
    newInfo.password = md5(newInfo.password)
    let newUser = new dataUsers(newInfo)
    await newUser.save();
    res.locals.user=newUser;
    res.cookie('tokenUser', newUser.tokenUser)
    req.flash('success', "Đăng ký tài khoản thành công!")
    res.redirect('/')
  }
}
module.exports.getLogin = (req, res) => {
  res.render('client/pages/users/login.pug', { title: "Đăng nhập", oldData: req.flash('oldData')[0] || {} })
}
module.exports.postLogin = async (req, res) => {
  const loginInfo = req.body;
  console.log(req.body)
  let checkExistsUser = await dataUsers.findOne({
    email: loginInfo.email,
    password: md5(loginInfo.password)
  });
  if (!checkExistsUser) {
    req.flash('error', "Thông tin đăng nhập không chính xác!")
    req.flash('oldData', loginInfo)
    res.redirect(req.headers.referer)
  }
  else {
    if (checkExistsUser.status != "active") {
      req.flash('error', "Tài khoản không ở trạng thái hoạt động!")
      res.redirect(req.headers.referer)
      return;
    }
    else {
      res.cookie("tokenUser", checkExistsUser.tokenUser);
      req.flash("success", "Đăng nhập thành công!")
      res.locals.user = checkExistsUser
      res.redirect('/')
    }
  }
}
module.exports.getLogout = async (req, res) => {
  delete res.locals.user;
  res.clearCookie('tokenUser');
  res.redirect(req.headers.referer)
}
module.exports.getForgotPassword = (req, res) => {
  res.render('client/pages/users/forgot-password.pug', { title: "Quên mật khẩu", oldData: req.flash('oldData')[0] || {} })
}
module.exports.postForgotPassword = async (req, res) => {
  let email = req.body.email;
  let checkExistsEmail = await dataUsers.findOne({
    email: email
  })
  if (!checkExistsEmail) {
    req.flash('error', 'Email không chính xác!')
    req.flash('oldData', req.body)
    res.redirect(req.headers.referer)
    return;
  }
  else {
    if (checkExistsEmail.status != 'active') {
      req.flash('error', 'Tài khoản tạm thời không hoạt động!')
      req.flash('oldData', req.body)
      res.redirect(req.headers.referer)
      return;
    }
    else {
      const otp=generateHelper.generateRandomInteger(6);
      let forgotInfo = {
        email: email,
        OTP: otp,
        expireAt: new Date(Date.now() + timeHelper.mins * 1)
      }
      let newForgotInfo = new dataForgotPassword(forgotInfo)
      await newForgotInfo.save();
      sendMail.sendEmail(email, "Xác nhận đặt lại mật khẩu!", `Mã xác thực của bạn là : <b>${otp}</b>`)
      res.redirect(`/users/password/otp?email=${email}`)
    }
  }
}
module.exports.getOTPPassword = (req, res) => {
  let email = req.query.email
  res.render('client/pages/users/otp-password.pug', { title: "Quên mật khẩu", email: email })
}

module.exports.postOTPPassword = async (req, res) => {
  let { email, otp } = req.body;
  let checkOTP = await dataForgotPassword.findOne({
    email: email,
    OTP: otp
  })
  if (!checkOTP) {
    req.flash('error', "Mã OTP không hợp lệ")
    res.redirect(req.headers.referer)
    return;
  }
  else {
    let user = await dataUsers.findOne({
      email: email
    })
    req.flash('success', "Vui lòng cập nhật mật khẩu mới!")
    res.cookie('tokenUser', user.tokenUser)
    res.redirect('/users/password/reset')
  }
}
module.exports.getResetPassword = (req, res) => {
  res.render('client/pages/users/reset-password.pug', { title: "Nhập mật khẩu mới", oldData:req.flash('oldData')[0]||{}})
}
module.exports.postResetPassword=async (req,res)=>{
  let tokenUser=req.cookies.tokenUser;
  if (tokenUser){
  let password=req.body.password;
  let checkUser=await dataUsers.findOne({
    tokenUser:tokenUser
  })
  await dataUsers.updateOne({
    tokenUser:tokenUser
  },{
    password:md5(password)
  })
  req.flash('success', "Cập nhật mật khẩu thành công!")
  res.redirect('/')
}
else{
  req.flash('error', "Đã xảy ra lỗi!")
  res.redirect(req.headers.referer);
}
}