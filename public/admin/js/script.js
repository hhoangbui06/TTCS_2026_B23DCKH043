let buttons=document.querySelectorAll("button[button-status]")
console.log("OKscript")
console.log(buttons)
let url=new URL(window.location.href)
for (let button of buttons){
    button.addEventListener("click", ()=>{
        const status=button.getAttribute("button-status")
        url.searchParams.set("status", status)
        if (!status){
            url.searchParams.delete("status")
        }
        console.log("OK")
        console.log(window.location.href)
        window.location.href=url.href
    })
}

let formSearch=document.querySelector("#form-search")
formSearch.addEventListener("submit", (e)=>{
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

let checkAll=document.querySelector("input[name='checkall']")
let checkSingle=document.querySelectorAll("input[name='id']")
checkAll.addEventListener("click", ()=>{
    for (let checkbox of checkSingle){
        if (checkAll.checked) checkbox.checked=true
        else checkbox.checked=false
    }
})
for (let checkbox of checkSingle){
    checkbox.addEventListener("click", ()=>{
        let checkedCount=document.querySelectorAll("input[name='id']:checked")
        if (checkedCount.length===checkSingle.length) checkAll.checked=true
        else checkAll.checked=false;
        // console.log(checkbox.value)
    })
}

let formChangeMulti=document.querySelector("[form-change-multi]")
formChangeMulti.addEventListener("submit", (e)=>{
    // e.preventDefault()
    let buttonChecked=document.querySelectorAll("input[name='id']:checked");
    let ids=[]
    for (let button of buttonChecked){
        console.log(button.value)
        ids.push(button.value)
    }
    let inputIds=formChangeMulti.querySelector("input[name='ids']")
    inputIds.value=ids.join(",")
})