module.exports=(query)=>{
    let title="";
    let keyword=query.keyword
    if(keyword) title=new RegExp(keyword, "i")
    return {
        title:title,
        keyword:keyword
    }
}