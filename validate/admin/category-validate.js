module.exports.createCategory=(req,res,next)=>{
    if (!req.body.title){
        req.flash('error', "Chưa nhập tên của danh mục!!")
        res.redirect(req.headers.referer)
    }
    next();
}