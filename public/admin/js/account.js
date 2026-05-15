// const dataAccounts=require('../../../models/account-models')
let formAccountDelete = document.querySelector("[form-account-delete]")
if (formAccountDelete) {
  let buttonAccountDelete = document.querySelectorAll('[button-account-delete]')
  for (let button of buttonAccountDelete) {
    button.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      let path = formAccountDelete.dataset.path;
      formAccountDelete.action = `${path}/${id}?_method=DELETE`
      formAccountDelete.submit();
    })
  }
}

let buttonAccountChangeStatus = document.querySelectorAll('[button-account-change-status')
let formAccountChangeStatus = document.querySelector('[form-account-change-status]')
if (buttonAccountChangeStatus.length > 0 && formAccountChangeStatus) {
  for (let button of buttonAccountChangeStatus) {
    button.addEventListener("click", async (e) => {
      let currentStatus = e.target.dataset.status;
      let newStatus = (currentStatus == "active") ? "inactive" : "active";
      let accountId = e.target.dataset.id;
      let path = formAccountChangeStatus.dataset.path
      formAccountChangeStatus.action = `${path}/${newStatus}/${accountId}`
      formAccountChangeStatus.submit();
    })
  }
}
let formAccountRecovery = document.querySelector("[form-account-recovery")
if (formAccountRecovery) {
  let buttonAccountRecovery = document.querySelectorAll("[button-account-recovery]")
  if (buttonAccountRecovery.length) {
    for (let button of buttonAccountRecovery) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        let isConfirm = confirm("Khôi phục mật khẩu mặc định?")
        if (isConfirm) {
          let id = e.target.dataset.id;
          let action = formAccountRecovery.action;
          formAccountRecovery.action = action + `/${id}`
          formAccountRecovery.submit();
        }
      })
    }
  }
}