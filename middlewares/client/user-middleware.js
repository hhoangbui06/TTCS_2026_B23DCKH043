const dataUsers=require('../../models/user-model')

module.exports.loginUser=async (req,res,next)=>{
  if(req.cookies.tokenUser){
    const user=await dataUsers.findOne({
      tokenUser:req.cookies.tokenUser,
      deleted:false,
      status:'active'
    }).select('-password')
    if(user){
      res.locals.user=user;
    }
  }
  next();
}