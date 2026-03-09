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