let formChange = document.querySelector("#form-change-status");
let badges = document.querySelectorAll("a[button-change-status]")

let pathChange = formChange.dataset.path;
for (let badge of badges) {
    badge.addEventListener("click", () => {
        let id = badge.dataset.id, currentStatus = badge.dataset.status;
        let newStatus=currentStatus=="inactive"?"active":"inactive"
        formChange.action = `${pathChange}/${newStatus}/${id}`      
        console.log(formChange.action)  
        formChange.submit()
    })
}