let buttonCartDelete=document.querySelectorAll('[button-cart-delete]')
if(buttonCartDelete.length>0){
  let formCartDelete=document.querySelector('[form-cart-delete]')
  if(formCartDelete){
    for(let button of buttonCartDelete){
      button.addEventListener("click", (e)=>{
        let id=e.target.dataset.id;
        let path=formCartDelete.dataset.path;
        formCartDelete.action=`${path}/${id}?_method=DELETE`
        formCartDelete.submit();
      })
    }
  }
}
let quantityInp=document.querySelectorAll("input[name='quantity']")
if(quantityInp.length>0){
  for (let inp of quantityInp){
    let formChange=document.querySelector('[form-cart-change-quantity]')
    inp.addEventListener("change", (e)=>{
      let productId=e.target.dataset.id;
      let quantity=e.target.value;
      let path=formChange.dataset.path;
      let action=`${path}/${productId}/${quantity}`
      formChange.action=action;
      formChange.submit();
    })
  }
}