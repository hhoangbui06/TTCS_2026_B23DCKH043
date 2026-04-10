const dataAccounts = require('../../models/account-models')
const dataRoles = require('../../models/role-models')
const systemConfig = require('../../config/system')
const PATH_ADMIN = systemConfig.prefixAdmin;

module.exports.authLogin = async (req, res, next) => {
  let token = req.cookies.token;
  let account = await dataAccounts.findOne({
    deleted: false,
    status: 'active',
    token: token
  }).select('-password')
  if (account) {
    res.locals.user = account;
    let role = await dataRoles.findOne({
      deleted: false,
      _id: account.role_id
    }).select('title permissions')
    res.locals.role = role || {}
    next()
  }
  else {
    res.redirect(PATH_ADMIN + '/auth/login')
  }
}