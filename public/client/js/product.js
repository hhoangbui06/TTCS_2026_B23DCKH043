let url=new URL(window.location.href)

let buttonStatus=document.querySelectorAll('[button-status]')
if (buttonStatus){
    for (let button of buttonStatus){
        button.addEventListener('click', (e)=>{
            let status=e.target.getAttribute("button-status")
            url.searchParams.set('status', status)
            if (!status) url.searchParams.delete('status') 
            window.location.href=url.href;
        })
    }
}
let formSearch=document.querySelector('#form-search')
if (formSearch){
    formSearch.addEventListener('submit',(e)=>{
        let keyword=e.target.value
        if (keyword) url.searchParams.set('keyword', keyword)
        window.location.href=url.href;
    })
}
let buttonPagination=document.querySelectorAll('.page-link')
if (buttonPagination){
    for (let button of buttonPagination){
        button.addEventListener('click', (e)=>{
            let page=e.target.getAttribute('button-pagination');
            url.searchParams.set('page', page)
            window.location.href=url.href;
        })
    }
}