let checkAll = document.querySelector("input[name='checkall']")
let checkSingle = document.querySelectorAll("input[name='id']")
if (checkAll) {
  checkAll.addEventListener("click", () => {
    for (let checkbox of checkSingle) {
      if (checkAll.checked) checkbox.checked = true
      else checkbox.checked = false
    }
  })
}
if (checkAll && checkSingle) {
  for (let checkbox of checkSingle) {
    checkbox.addEventListener("click", () => {
      let checkedCount = document.querySelectorAll("input[name='id']:checked")
      if (checkedCount.length === checkSingle.length) checkAll.checked = true
      else checkAll.checked = false;
    })
  }
}
let formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    let ids = []
    let checkbox = document.querySelectorAll("input[name='id']:checked")
    let typeChange=e.target.elements.type.value;
    if (checkbox.length < 1) {
      alert("Chưa chọn sản phẩm!")
    }
    else if (!typeChange){
      alert("Chưa chọn hành động thực hiện!")
    }
    else {
      let isConfirm = false;
      switch (typeChange) {
        case "delete-multi":
          isConfirm = confirm("Xóa vĩnh viễn các sản phẩm đã chọn?")
          break;
        case "recovery-multi":
          isConfirm = confirm("Khôi phục các sản phẩm đã chọn?")
          break;
      }
      if (isConfirm) {
        for (let box of checkbox) {
          ids.push(String(box.value))
        }
        let idsInput = document.querySelector("input[name='ids']")
        idsInput.value = ids.join(',')
        formChangeMulti.submit();
      }
    }
  })
}


let formDelete = document.querySelector("#form-delete-item")
if (formDelete) {
  let pathDelete = formDelete.dataset.path
  let buttonDelete = document.querySelectorAll("button[button-delete]");
  for (let button of buttonDelete) {
    button.addEventListener("click", () => {
      let isConfirm = confirm("Sản phẩm sẽ bị xóa vĩnh viễn?")
      if (isConfirm) {
        let id = button.dataset.id;
        let action = `${pathDelete}/${id}?_method=DELETE`
        formDelete.action = action;
        formDelete.submit()
      }
    })
  }
}
let formRecovery = document.querySelector("#form-recovery-item")
if (formRecovery) {
  let buttonRecovery = document.querySelectorAll("button[button-recovery]")
  if (buttonRecovery) {
    for (let button of buttonRecovery) {
      button.addEventListener("click", (e) => {
        let id = e.target.dataset.id
        let action = formRecovery.dataset.path + `/${id}`
        formRecovery.action = action;
        formRecovery.submit();
      })
    }
  }
}
let formRecoveryAll = document.querySelector("#form-recovery-all")
if (formRecoveryAll) {
  let button = document.querySelector("#recovery-all")
  button.addEventListener("click", (e) => {
    e.preventDefault()
    formRecoveryAll.submit();
  })
}