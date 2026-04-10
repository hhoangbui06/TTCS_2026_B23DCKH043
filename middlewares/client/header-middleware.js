const dataCategory=require('../../models/category-model');
const createTree=require('../../helpers/create-tree-helper')
module.exports.getCategory=async(req,res, next)=>{
  let find={
    deleted:false
  }
  const records=await dataCategory.find(find);
  const newProductCategory=createTree.create(records);
  res.locals.layoutProductCategory=newProductCategory||[]
  next();
}