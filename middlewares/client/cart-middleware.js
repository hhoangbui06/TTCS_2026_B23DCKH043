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
  else{
    let cart=await dataCart.findOne({
      _id:req.cookies.cartId
    })
    let products=cart.products;
    let totalProducts=products.reduce((total,item)=>{
      return total+item.quantity;
    },0)
    cart.totalQuantity=totalProducts;
    res.locals.miniCart=cart;
  }
  next();
}