const data = require('../../models/category-model.js')
const createTree = require('../../helpers/create-tree-helper.js')


module.exports.index = async (req, res) => {
    let sortCondition = {}
    if (req.query.sortKey && req.query.sortValue) {
        sortCondition[req.query.sortKey] = req.query.sortValue;
    }
    let find = {
        deleted: false
    }
    let keySearch = req.query.keyword;
    if (keySearch) {
        find['title'] = new RegExp(keySearch, 'i');
    }
    let categories = await data.find(find)
    const newRecords = createTree.create(categories)

    categories.map((item) => {
        item.badge = (item.status === "active" ? "badge badge-success" : "badge badge-danger")
        item.stt = (item.status === "active" ? "Hoạt động" : "Ngừng hoạt động")
    })
    res.render('admin/pages/category/index.pug', { title: "Danh mục sản phẩm", categories: newRecords, keyword: keySearch })
}
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    let records = await data.find(find)
    const newRecords = createTree.create(records)

    res.render('admin/pages/category/create.pug', { title: "Tạo mới danh mục", newRecords: newRecords })
}
module.exports.createCategory = async (req, res) => {
    if (!req.body.position) {
        let count = await data.countDocuments();
        req.body.position = count + 1;
    }
    else {
        req.body.position = Number(req.body.position)
    }
    const newCategory = new data(req.body);
    await newCategory.save();
    req.flash('success', "Đã thêm mới danh mục sản phẩm")
    res.redirect(req.headers.referer)
}

module.exports.changeStatus = async (req, res) => {
    let status = req.params.status, id = req.params.id;
    await data.updateOne({ _id: id }, { status: status });
    req.flash('success', "Đã thay đổi trạng thái của danh mục!")
    res.redirect(req.headers.referer)
}
module.exports.deleteCategory = async (req, res) => {
    let id = req.params.id;
    await data.updateOne({ _id: id }, { deleted: true })
    req.flash('success', "Đã xóa thành công danh mục!")
    res.redirect(req.headers.referer)
}
module.exports.recoveryAll = async (req, res) => {
    await data.updateMany({}, { deleted: false })
    req.flash('success', "Đã khôi phục toàn bộ danh mục!")
    res.redirect(req.headers.referer)
}
module.exports.detailCategory = async (req, res) => {
    let id = req.params.id;
    let category = await data.findOne({ _id: id })
    res.render('admin/pages/category/detail.pug', { title: "Chi tiết sản phẩm", category: category })
}
module.exports.editCategory = async (req, res) => {
    let find = {
        deleted: false
    }
    let records = await data.find(find)
    const newRecords = createTree.create(records)

    let id = req.params.id;
    let category = await data.findOne({ _id: id })
    res.render('admin/pages/category/edit.pug', { title: "Chỉnh sửa sản phẩm", category: category, newRecords: newRecords })
}
module.exports.patchCategory = async (req, res) => {
    let id = req.params.id;
    let recordCount = await data.countDocuments();
    if (req.body.position) req.body.position = Number(req.body.position)
    else req.body.position = recordCount + 1;
    await data.updateOne({ _id: id }, req.body)
    req.flash("success", "Đã cập nhật thành công danh mục!")
    res.redirect(req.headers.referer)
}

module.exports.changeMulti = async (req, res) => {
    let idString = req.body.ids, type = req.body.type;
    let ids_pos = idString.split(',');
    let ids = ids_pos.map(item => item.split('-')[0])
    switch (type) {
        case "active":
            await data.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Đã cập nhật trạng thái của ${ids.length} danh mục!`)
            break;
        case "inactive":
            await data.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Đã cập nhật trạng thái của ${ids.length} danh mục!`)
            break;
        case "delete-all":
            await data.updateMany({ _id: { $in: ids } }, { deleted: true })
            req.flash('success', `Đã xóa ${ids.length} danh mục!`)
            break;
        case "change-position":
            for (let id_pos of ids_pos) {
                let [id, pos] = id_pos.split('-');
                await data.updateOne({ _id: id }, { position: pos });
            }
            req.flash('success', `Đã cập nhật vị trí của ${ids.length} danh mục!`)
            break;
        default:
            break;
    }
    res.redirect(req.headers.referer)
}