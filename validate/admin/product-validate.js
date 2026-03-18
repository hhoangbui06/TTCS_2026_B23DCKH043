module.exports.createItem=(req,res,next)=>{
    if (!req.body.title){
        req.flash('titleError', 'Chưa nhập tiêu đề!');
        res.redirect(req.headers.referer);
        return;
    }
    next();
}