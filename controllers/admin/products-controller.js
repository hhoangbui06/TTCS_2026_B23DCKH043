const data=require('../../models/product-model')
module.exports.index=async (req,res)=>{
    let filterStatus=[
        {
            name:"Tất cả",
            status:"",
            check:"",
        },
        {
            name:"Hoạt động",
            status:"",
            check:"active"
        },
        {
            name:"Dừng hoạt động",
            status:"",
            check:"inactive"
        }
    ]
    let find={
        delete:false
    }
    for (let key in req.query){
        let value=req.query[key]
        if (value) find[key]=req.query[key]
    }
    let queryStatus=req.query.status||""
    for (let stt of filterStatus){
        if (stt.check==queryStatus){
            stt.status="active"
        }
        else{
            stt.status=""
        }
    }

    const products=await data.find(find);
    products.forEach(item=>{
        item.priceNew=Math.round(item.price*(100-item.discountPercentage)/100);
        item.badge=item.status=="inactive"?"badge badge-danger":"badge badge-success";
        item.stt=item.badge==="badge badge-danger"?"Không hoạt động":"Hoạt động";
    })
    res.render('admin/pages/products/index.pug', {title:"Product", products:products, filterStatus:filterStatus})
}