
let url_category = new URL(window.location.href);
let buttonChange = document.querySelectorAll("[button-change-status]")
if (buttonChange) {
    let formChange = document.querySelector("[form-change-status]")
    for (let button of buttonChange) {
        button.addEventListener("click", (e) => {
            let currentStatus = e.target.dataset.status;
            let id = e.target.dataset.id;
            let newStatus = currentStatus == "active" ? "inactive" : "active"
            let path = formChange.dataset.path;
            formChange.action = `${path}/${newStatus}/${id}`
            formChange.submit();
        })
    }
}

let buttonDelete = document.querySelectorAll('[button-delete-category]')
if (buttonDelete) {
    let formDelete = document.querySelector('[form-delete-category]')
    for (let button of buttonDelete) {
        button.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            let path = formDelete.dataset.path;
            formDelete.action = `${path}/${id}?_method=DELETE`
            formDelete.submit();
        })
    }
}
let checkSingle = document.querySelectorAll("[name='checksingle']")
let checkAll = document.querySelector("[name='checkall']")
let ids = []
if (checkSingle) {
    for (let checkbox of checkSingle) {
        checkbox.addEventListener("click", (e) => {
            let checkedBox = document.querySelectorAll("[name='checksingle']:checked")
            if (checkedBox.length === checkSingle.length) checkAll.checked = true
            else checkAll.checked = false
        })
    }
}
if (checkAll) {
    checkAll.addEventListener("click", (e) => {
        for (let checkbox of checkSingle) {
            if (e.target.checked == true) checkbox.checked = true;
            else checkbox.checked = false
        }
    })
}
let buttonEdit = document.querySelectorAll('[button-edit-category]')
if (buttonEdit) {
    let formEdit = document.querySelector('[form-edit-category]')
    for (let button of buttonEdit) {
        button.addEventListener('click', (e) => {
            let id = e.target.dataset.id;
            let path = formEdit.dataset.path
            formEdit.action = `${path}/${id}?_method=PATCH`
            formEdit.submit();
        })
    }
}



let formSearchCategory = document.querySelector("#form-search-categories")
if (formSearchCategory) {
    formSearchCategory.addEventListener('submit', (e) => {
        let value = e.target.value;
        url_category.searchParams.set('keyword', value)
        if (!value) url_category.searchParams.delete('keyword')
        window.location.href = url_category.href
    })
}

let formChange = document.querySelector('[form-change-multi]')
if (formChange) {
    formChange.addEventListener('submit', (e) => {
        let ids = []
        let checkedBox = document.querySelectorAll("[name='checksingle']:checked");
        let type = e.target.elements.type.value;
        if (!type){
            e.preventDefault();
            alert("Chọn hành động muốn thực hiện!")
            return;
        }
        if (type==="delete-multi"){
            let isConfirm=confirm("Chắc chắn xóa các danh mục đã chọn?");
            if (!isConfirm){
                e.preventDefault();
                return;
            }
        }
        if (checkedBox.length < 1) {
            e.preventDefault();
            alert('Chọn danh mục cần thay đổi!')
            return;
        }
        else {
            for (let checkbox of checkedBox) {
                let tr=checkbox.closest("tr");
                let newPosition=tr.querySelector("[name='position']")
                let tmp = `${checkbox.value}-${newPosition.value}`;
                ids.push(tmp);
            }
            let idsInput = formChange.querySelector("[name='ids']")
            idsInput.value = ids.join(',')
        }
    })
}