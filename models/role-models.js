const mongoose=require('mongoose')
const slug=require('mongoose-slug-updater')
mongoose.plugin(slug)
let roleSchema=new mongoose.Schema({
    title:String,
    description:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type:Boolean,
        default:false
    },
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deletedAt:Date
},
{
    timestamps:true
});
const roles= mongoose.model('Roles', roleSchema, 'roles');
module.exports=roles;