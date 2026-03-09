const product=require('../../models/product-model');
module.exports.index=async (req,res)=>{
    console.log("Product controller running");
    const products=await product.find({
        status:'active',
        delete:false
    });
    products.forEach(item=>{
        item.priceNew=Math.round(item.price*(100-item.discountPercentage)/100)
    })
    console.log(products)
    res.render('client/pages/products/index.pug', {title:"Product", boxheadTitle:"This is product page!", products:products})
}
