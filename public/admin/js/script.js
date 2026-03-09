let buttons=document.querySelectorAll("button[button-status]")
let url=new URL(window.location.href)
for (let button of buttons){
    button.addEventListener("click", ()=>{
        const status=button.getAttribute("button-status")
        url.searchParams.set("status", status)
        if (!status){
            url.searchParams.delete("status")
        }
        window.location.href=url.href
    })
}

let form=document.querySelector("#form-search")
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const keyword=e.target.elements.keyword.value;
    console.log(keyword)
    console.log("OK")
    url.searchParams.set("keyword", keyword);
    console.log(url.searchParams)
    if (!keyword) url.searchParams.delete("keyword")
    window.location.href=url.href;
}) 

let buttonPages=document.querySelectorAll(".page-link");
for (let button of buttonPages){
    button.addEventListener("click", ()=>{
        let page=button.getAttribute("button-pagination");
        url.searchParams.set("page",page)
        window.location.href=url.href        
    })
}
