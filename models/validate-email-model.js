const mongoose=require('mongoose')

const forgotPasswordSchema=new mongoose.Schema({
  email:String,
  OTP:String,
  expireAt:{
    type:Date,
    expires:0
  }
},{
  timestamps:true
})

const forgotPassword=mongoose.model('ValidateEmail', forgotPasswordSchema, 'validate-email')
module.exports=forgotPassword