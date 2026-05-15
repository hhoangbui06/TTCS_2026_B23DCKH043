const mongoose=require('mongoose')
const generate=require('../helpers/generate-helper')

const userSchema=new mongoose.Schema({
  fullName:String,
  email:String,
  password:String,
  tokenUser:{
    type:String,
    default:generate.generateRandomString(20)
  },
  avatar:String,
  phone:String,
  avatar:{
    type:String,
    default:"https://res.cloudinary.com/dwmzdnacn/image/upload/v1778812647/t%E1%BA%A3i_xu%E1%BB%91ng_aarq4c.png"
  },
  address:String,
  status:{
    type:String,
    default:'active'
  },
  deleted:{
    type:Boolean,
    default:false
  },
  deletedAt:Date
},
{
  timestamps:true 
})
const user=mongoose.model('User', userSchema, 'users')
module.exports=user