const mongoose=require('mongoose')
const slug=require('mongoose-slug-updater')
mongoose.plugin(slug)
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
    slug:{
        type:String,
        slug:"title",
        unique:true
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
const products=mongoose.model("products", productSchema)
module.exports=products