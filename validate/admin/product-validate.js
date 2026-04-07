module.exports.createItem=(req,res,next)=>{
    if (!req.body.title){
        req.flash('error', 'Chưa nhập tiêu đề!');
        req.flash('oldData', req.body)
        res.redirect(req.headers.referer);
        return;
    }
    next();
}