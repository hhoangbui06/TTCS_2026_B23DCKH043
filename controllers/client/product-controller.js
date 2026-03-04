module.exports.index=(req,res)=>{
    res.render('client/pages/products/index.pug', {title:"Product page", message:"This is product page"})
}