
let buttonRoleDelete=document.querySelectorAll('[button-role-delete]')
if (buttonRoleDelete){
  let formRoleDelete=document.querySelector('[form-role-delete]')
  console.log(formRoleDelete)
  for (let button of buttonRoleDelete){
    button.addEventListener('click', (e)=>{
      let id=e.target.dataset.id;
      let path=formRoleDelete.dataset.path;
      console.log(path)
      formRoleDelete.action=`${path}/${id}?_method=DELETE`
      formRoleDelete.submit()
    })
  }
}
