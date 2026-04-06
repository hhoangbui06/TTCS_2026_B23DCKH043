const dataRole = require('../../models/role-models');

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  let records = await dataRole.find(find)
  res.render('admin/pages/role/index.pug', { title: "Quyền người dùng", records: records })
}

module.exports.create = (req, res) => {
  res.render('admin/pages/role/create.pug', { title: "Tạo quyền mới" })
}
module.exports.createRole = async (req, res) => {
  let newRole = new dataRole(req.body);
  await newRole.save();
  res.redirect(req.headers.referer)
} 
module.exports.detailRole=async (req,res)=>{
  let id=req.params.id;
  let role=await dataRole.findOne({_id:id});
  res.render('admin/pages/role/detail.pug', {title: "Chi tiết về quyền", role:role})
}
module.exports.edit=async (req,res)=>{
  let id=req.params.id;
  let role=await dataRole.findOne({_id:id})
  res.render('admin/pages/role/edit.pug', {title:"Chỉnh sửa quyền", role:role})
}
module.exports.editRole=async (req,res)=>{
  let id=req.params.id;
  await dataRole.updateOne({_id:id}, req.body);
  req.flash('success', 'Cập nhật quyền tài khoản thành công!')
  res.redirect(req.headers.referer)
}
module.exports.deleteRole=async(req,res)=>{
  let id=req.params.id;
  await dataRole.updateOne({_id:id}, {deleted:true});
  req.flash('success', "Đã xóa quyền tải khoản!")
  res.redirect(req.headers.referer)
}
module.exports.permissionIndex=async(req,res)=>{
  let find={
    deleted:false
  }
  let records=await dataRole.find(find);
  res.render('admin/pages/role/permission.pug', {title:"Phân quyền", records:records})
}
module.exports.patchPermissions=async (req,res)=>{
  let update=JSON.parse(req.body.permissions);
  for (let item of update){
    let id=item.id, permissions=item.permissions;
    await dataRole.updateOne({_id:id}, {permissions:permissions})
  }
  req.flash('success', "Đã cập nhật thành công!")
  res.redirect(req.headers.referer)
}