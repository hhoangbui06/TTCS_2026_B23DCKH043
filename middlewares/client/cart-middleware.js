const dataCart=require('../../models/cart-models')
const expiresHelper=require('../../helpers/expires-time.helper')
module.exports.checkCart=async (req,res,next)=>{
  if(!req.cookies.cartId){
    let newCart=new dataCart();
    await newCart.save();
    res.cookie("cartId", newCart._id,{
      expires: new Date(Date.now() + expiresHelper.days*7)
    });
  }
  next();
}