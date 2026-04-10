const dataCategory = require('../models/category-model')
module.exports.getSubCategory = async (categoryId) => {
  const getSub = async (parentId) => {
    const subs = await dataCategory.find({
      deleted: false,
      status: 'active',
      parent_id: parentId
    });
    let allSubs = [...subs]
    for (let sub of subs) {
      let child = await getSub(sub._id);
      allSubs = allSubs.concat(child);
    }
    return allSubs;
  }
  let allSubCategory = await getSub(categoryId);
  let allSubCategoryId = allSubCategory.map((item) => item._id)
  let res = [categoryId, ...allSubCategoryId]
  return res;
}

