const mongoose=require('mongoose')
const slug=require('mongoose-slug-updater')

const categorySchema= new mongoose.Schema({
    id:String,
    title:String,
    parent_id:{
        type:String,
        default: ""
    },
    description:String,
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
const category=mongoose.model('Category', categorySchema, 'products-category')
module.exports=category