const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    thumbnail:String,
    status:String,
    position:Number,
    delete:Boolean
})
const products=mongoose.model("products", productSchema)
module.exports=products