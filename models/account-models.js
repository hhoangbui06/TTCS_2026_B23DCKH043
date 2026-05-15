const slug=require('mongoose-slug-updater')
const mongoose=require('mongoose')
const generate=require('../helpers/generate-helper')

const accountSchema=new mongoose.Schema({
  fullName:String,
  email:String,
  password:String,
  token:{
    type:String,
    default:generate.generateRandomString(20)
  },
  phone:String,
  avatar:{
    type:String,
    default:"https://res.cloudinary.com/dwmzdnacn/image/upload/v1778812647/t%E1%BA%A3i_xu%E1%BB%91ng_aarq4c.png"
  },
  role_id:String,
  status:String,
  address:String,
  deleted:{
    type:Boolean,
    default:false
  },
  createdBy:{
    account_id:String,
    createdAt:{
      type:String,
      default:Date.now
    }
  },
  deletedAt:Date
},
{
  timestamps:true 
})
const account=mongoose.model('Accounts', accountSchema, 'accounts')
module.exports=account;