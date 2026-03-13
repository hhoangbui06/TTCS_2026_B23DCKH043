const data = require('../../models/product-model')
const filterStatusHelper = require('../../helpers/filterStatus-helper')
const searchHelper = require('../../helpers/search-helper')
const pagination = require('../../helpers/pagination-helper')

module.exports.recovery=async(req,res)=>{
    await data.updateMany({}, {deleted:false})
    res.redirect(req.headers.referer)
}
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
        totalProduct: count
    }
    pagination(objectPagination, req.query, find)
    const products = await data.find(find).skip(objectPagination.skipItems).limit(objectPagination.limitItems);
    products.sort((a,b)=>a.position-b.position)
    products.forEach(item => {
        item.priceNew = Math.round(item.price * (100 - item.discountPercentage) / 100);
        item.badge = item.status == "inactive" ? "badge badge-danger" : "badge badge-success";
        item.stt = item.badge === "badge badge-danger" ? "Không hoạt động" : "Hoạt động";
    })
    res.render('admin/pages/products/index.pug', { title: "Product", products: products, filterStatus: filterStatus, keyword: search.keyword, objectPagination: objectPagination })
}
module.exports.changeStatus = async (req, res) => {
    await data.updateOne({ _id: req.params.id }, { status: req.params.status })
    req.flash('success', 'Cập nhật thành công!')
    res.redirect(req.headers.referer)
}

module.exports.changeMulti = async (req, res) => {
    let tmp = req.body.ids.split(',');
    let ids=[], pos=[];
    for (let x of tmp){
        let check=x.split('-');
        ids.push(check[0]);
        pos.push(check[1])
    }
    if (ids.length) {
        let type = req.body.type;
        switch (type) {
            case "active":
                await data.updateMany({ _id: { $in: ids } }, { status: "active" });
                req.flash('success', `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm!`)
                break;
            case "inactive":
                await data.updateMany({ _id: { $in: ids } }, { status: "inactive" });
                req.flash('success', `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm!`)
                break;
            case "delete-all":
                await data.updateMany({_id:{$in:ids}}, {deleted:true, deletedAt:new Date()})
                req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm!`)
                break;

            case "change-position":
                for (let i =0; i<ids.length; i++){
                    await data.updateOne({_id:ids[i]}, {position:pos[i]})
                }
                req.flash('success', `Đã cập nhật thành công vị trí của ${ids.length} sản phẩm!`)

                break;
            default:
                break;


        }
    }
    res.redirect(req.headers.referer)

}
module.exports.deleteProduct = async (req, res) => {
    let id = req.params.id;
    // res.send(id)
    // await data.updateMany({}, {deleted:false})
    await data.updateOne({ _id: id }, { deleted: true, deletedAt:new Date()})
    res.redirect(req.headers.referer)
    // console.log(result)
}