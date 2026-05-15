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
            window.location.href = url.href
        })
    }
}
let formSearch = document.querySelector("#form-search-products")
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        url.searchParams.set("keyword", keyword);
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
let buttonPagination = document.querySelectorAll(".page-link")
if (buttonPagination) {
    for (let button of buttonPagination) {
        button.addEventListener('click', (e) => {
            let page = Number(e.target.getAttribute('button-pagination'))
            url.searchParams.set('page', page);
            if (!page) {
                url.searchParams.delete('page')
            }
            window.location.href = url.href;
        })
    }
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
    const buttonClearImage = uploadImage.querySelector('#clear-input-image')
    const hiddenAvatar = uploadImage.querySelector('input[type="hidden"][name="avatar"]');
    if(uploadImagePreview.getAttribute('src')) buttonClearImage.classList.remove('btn-hidden')
    uploadImageInput.addEventListener('change', (e) => {
        if(buttonClearImage.classList.contains('btn-hidden')) buttonClearImage.classList.remove('btn-hidden');
        let file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
    buttonClearImage.addEventListener('click', (e) => {
        e.target.classList='btn-hidden';
        uploadImageInput.value = ""; 
        uploadImagePreview.src = ''
        if(hiddenAvatar) hiddenAvatar.value = '';
    })
}

let sortDiv = document.querySelector("div[sort]")
if (sortDiv) {
    let sortSelect = document.querySelector("[sort-select]");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            let value = e.target.value;
            let [sortKey, sortValue] = value.split('-');
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            window.location.href = url.href;
        })
    }
    let sortClear = document.querySelector("[sort-clear]");
    if (sortClear) {
        sortClear.addEventListener('click', (e) => {
            if (url.searchParams.has("sortKey")) url.searchParams.delete("sortKey");
            if (url.searchParams.has("sortValue")) url.searchParams.delete("sortValue");
            window.location.href = url.href;
        })
    }
    let sortKey = url.searchParams.get("sortKey"), sortValue = url.searchParams.get("sortValue")
    if (sortKey && sortValue) {
        let sortCondition = `${sortKey}-${sortValue}`;
        let option = document.querySelector(`option[value=${sortCondition}]`);
        option.selected = true;
    }
}