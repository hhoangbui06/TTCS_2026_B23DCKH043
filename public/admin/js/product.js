let formChange = document.querySelector("#form-change-status");
let badges = document.querySelectorAll("a[button-change-status]")
if (formChange){
let pathChange = formChange.dataset.path;
if (badges){
for (let badge of badges) {
    badge.addEventListener("click", () => {
        let id = badge.dataset.id, currentStatus = badge.dataset.status;
        let newStatus = currentStatus == "inactive" ? "active" : "inactive"
        formChange.action = `${pathChange}/${newStatus}/${id}?_method=PATCH`
        formChange.submit()
    })}
}}

let checkAll = document.querySelector("input[name='checkall']")
let checkSingle = document.querySelectorAll("input[name='id']")
if (checkAll){
checkAll.addEventListener("click", () => {
    for (let checkbox of checkSingle) {
        if (checkAll.checked) checkbox.checked = true
        else checkbox.checked = false
    }
})}
if (checkAll && checkSingle){
for (let checkbox of checkSingle) {
    checkbox.addEventListener("click", () => {
        let checkedCount = document.querySelectorAll("input[name='id']:checked")
        if (checkedCount.length === checkSingle.length) checkAll.checked = true
        else checkAll.checked = false;
        // console.log(checkbox.value)
    })
}
}
let formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti){
formChangeMulti.addEventListener("submit", (e) => {
    // e.preventDefault()
    let buttonChecked = document.querySelectorAll("input[name='id']:checked");
    let typeChange = e.target.elements.type.value
    if (buttonChecked.length < 1) {
        e.preventDefault()
        alert("Chọn sản phẩm muốn thay đổi!")
    }
    else {
        if (typeChange == "delete-all") {
            let isConfirm=confirm("Chắc chắn xóa tất cả sản phẩm đã chọn?")
            if (!isConfirm) e.preventDefault()  
        }   
        let ids = []
        for (let button of buttonChecked) {
            let tr=button.closest("tr");
            let setPosition=tr.querySelector("input[name='position']")
            console.log(setPosition)
            let idString=button.value
            if (typeChange="change-position") idString+=`-${setPosition.value}`
            ids.push(idString)
        }
        let inputIds = formChangeMulti.querySelector("input[name='ids']")
        inputIds.value = ids.join(",")
    }
})}

let formDelete = document.querySelector("#form-delete-item")
if (formDelete){
let pathDelete = formDelete.dataset.path
let buttonDelete = document.querySelectorAll("button[button-delete]");
for (let button of buttonDelete) {
    button.addEventListener("click", () => {
        let isConfirm = confirm("Chắc chắn xóa sản phẩm này?")
        if (isConfirm) {
            let id = button.dataset.id;
            let action = `${pathDelete}/${id}?_method=DELETE`
            formDelete.action = action;
            formDelete.submit()
        }
    })
}}