const data=require('../../models/product-model');
const filterStatusHelper=require('../../helpers/filterStatus-helper')
const searchHelper=require('../../helpers/search-helper')
const paginationHelper=require('../../helpers/pagination-helper')



module.exports.index=async (req,res)=>{
    console.log("Product controller running");
        let find={
        deleted:false,
        status:'active'
    }
    let searchTitle=searchHelper(req.query)
    if (searchTitle.title) find['title']=searchTitle.title
    const counts=await data.countDocuments(find);
    let objectPagination={
        currentPage:1,
        limitItems:6,
        totalProduct:counts        
    }
    paginationHelper(objectPagination, req.query)
    let products=await data.find(find).skip(objectPagination.skipItems).limit(objectPagination.limitItems)
    products.forEach(item=>{
        item.priceNew=Math.round(item.price*(100-item.discountPercentage)/100)
    })
    // console.log(products)
    res.render('client/pages/products/index.pug', {title:"Product", boxheadTitle:"This is product page!", products:products, keyword:searchTitle.keyword,
        objectPagination:objectPagination
    })
}
module.exports.detailItem=async(req,res)=>{
    let slug=req.params.slug;
    let find={
        deleted:false,
        slug:slug,
        status:'active'
    }
    let product=await data.findOne(find)
    res.render('client/pages/products/detail.pug', {title:"Chi tiết sản phẩm", product:product})
}