console.log("OKscript")
let url = new URL(window.location.href)
let buttons = document.querySelectorAll("button[button-status]")
if (buttons) {
    for (let button of buttons) {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            url.searchParams.set("status", status)
            if (!status) {
                url.searchParams.delete("status")
            }
            console.log("OK")
            console.log(window.location.href)
            window.location.href = url.href
        })
    }
}
let formSearch = document.querySelector("#form-search")
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        console.log(keyword)
        console.log("OK")
        url.searchParams.set("keyword", keyword);
        console.log(url.searchParams)
        if (!keyword) url.searchParams.delete("keyword")
        window.location.href = url.href;
    })

    let buttonPages = document.querySelectorAll(".page-link");
    if (buttonPages) {
        for (let button of buttonPages) {
            button.addEventListener("click", () => {
                let page = button.getAttribute("button-pagination");
                url.searchParams.set("page", page)
                window.location.href = url.href
            })
        }
    }
}

let btnRecovery = document.querySelector("#recovery")
if (btnRecovery) {
    btnRecovery.addEventListener("click", (e) => {
        window.location.href = e.target.dataset.path;
    })
}

let alertSuccess = document.querySelector('[show-alert]')
if (alertSuccess) {
    const showTime = Number(alertSuccess.dataset.time);
    const closeAlert = alertSuccess.querySelector('[close-alert]')
    closeAlert.addEventListener("click", () => {
        alertSuccess.classList.add('alert-hidden')
    })
    setTimeout(() => {
        alertSuccess.classList.add("alert-hidden")
    }, showTime);
}

const uploadImage = document.querySelector('[upload-image]')
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');
    const buttonClearImage=uploadImage.querySelector('#clear-input-image')
    uploadImageInput.addEventListener('change', (e) => {
        console.log(e)
        buttonClearImage.classList.remove('btn-hidden');
        let file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
    buttonClearImage.addEventListener('click', (e)=>{
        e.target.classList.add('btn-hidden');
        uploadImageInput.value="";
        uploadImagePreview.src=''
    })
}