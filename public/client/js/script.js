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