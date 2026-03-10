const data = require('../../models/product-model')
const filterStatusHelper = require('../../helpers/filterStatus-helper')
const searchHelper = require('../../helpers/search-helper')
const pagination=require('../../helpers/pagination-helper')


module.exports.index = async (req, res) => {
    let filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false
    }
    if (req.query.status) {
        let value = req.query.status;
        find["status"] = value
    }
    let search = searchHelper(req.query)
    if (search.keyword) find.title = search.title
    const count = await data.countDocuments(find)

    let objectPagination = {
        currentPage: 1,
        limitItems: 4,
        totalProduct:count
    }
    pagination(objectPagination,req.query, find)
    const products = await data.find(find).skip(objectPagination.skipItems).limit(objectPagination.limitItems);
    products.forEach(item => {
        item.priceNew = Math.round(item.price * (100 - item.discountPercentage) / 100);
        item.badge = item.status == "inactive" ? "badge badge-danger" : "badge badge-success";
        item.stt = item.badge === "badge badge-danger" ? "Không hoạt động" : "Hoạt động";
    })
    res.render('admin/pages/products/index.pug', { title: "Product", products: products, filterStatus: filterStatus, keyword: search.keyword, objectPagination: objectPagination })
}
module.exports.changeStatus=async (req,res)=>{
    await data.updateOne({_id:req.params.id}, {status:req.params.status})
    res.redirect(req.headers.referer)
}