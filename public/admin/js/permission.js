let tablePermission = document.querySelector('[table-permission]')
if (tablePermission) {
  let rows = tablePermission.querySelectorAll('tr[data-name]')
  let roles = []
  let buttonSubmit = document.querySelector('[button-submit]')
  buttonSubmit.addEventListener("click", () => {
    for (let row of rows) {
      let name = row.dataset.name
      let inputs = row.querySelectorAll('input:not([check-all])')
      if (name === 'id') {
        for (let input of inputs) {
          roles.push({
            id: input.value,
            permissions: []
          })
        }
      }
      else {
        inputs.forEach((input, index) => {
          {
            if (input.checked) roles[index].permissions.push(name)
          }
        })
      }
    }
    if (roles.length) {
      let formPermissions = document.querySelector("#form-change-permissions")
      let inputPermissions = formPermissions.querySelector('input')
      inputPermissions.value = JSON.stringify(roles)
      formPermissions.submit();
    }

  })

}
let checkAll = document.querySelectorAll('[check-all]');
if (checkAll.length) {

  let checkSingle = document.querySelectorAll(`input:not([check-all])`)
  for (let checkbox of checkSingle) {
    checkbox.addEventListener("click", () => {
      let dataId = checkbox.dataset.id;
      let checkSingle = document.querySelectorAll(`input[data-id="${dataId}"]:not([check-all])`)

      let checkChecked = document.querySelectorAll(`input[data-id="${dataId}"]:checked:not([check-all])`)
      let checkboxAll = document.querySelector(`input[data-id="${dataId}"][check-all]`)

      if (checkChecked.length === checkSingle.length) {
        checkboxAll.checked = true;
      }
      else {
        checkboxAll.checked=false;
      }
    })
  }

  for (let checkbox of checkAll) {
    checkbox.addEventListener('click', () => {
      let dataId = checkbox.dataset.id;
      let checkSingle = document.querySelectorAll(`input[data-id="${dataId}"]:not([check-all])`)
      if (checkbox.checked) {
        for (let box of checkSingle) {
          box.checked = true;
        }
      }
      else {
        for (let box of checkSingle) {
          box.checked = false;
        }
      }

    })
  }
}

let recordsDiv=document.querySelector('[data-records]')
if (recordsDiv){
  let records=JSON.parse(recordsDiv.dataset.records)
  for (let [index, record] of records.entries()){
    let permissions=record.permissions
    for (let permission of permissions){
      let tr=document.querySelector(`[data-name="${permission}"]`)
      let checkbox=tr.querySelectorAll("input")
      checkbox[index].checked=true;
    }
  }
}